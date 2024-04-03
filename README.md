This project is to keep track and serve historical data of Geisel Library and WongAvery library busyness. It can also track other locations with the right setup listed below. An API to service the tracked data is planned.



### Installation
1. **Create a Supabase Project:** 
    
    Create a database with [Supabase](https://supabase.com/)

    Follow the steps provided in [this tutorial](https://supabase.com/partners/integrations/prisma) to create obtain the Postgres connection strings.

    Create a .env file in ./ScraperService/main and define your
    DATABASE_URL and DIRECT_URL variables.

2. **Configure Your Project:**

    Edit the facilities you want to track in the `./ScraperService/main/waitzData.ts` file, by editing the 'LOCS_TO_TRACK' variable. It'll be an array with objects of the form 

   ```
    {[LOCATION_ID]: {trackSubLocations: true/false}}
   ```

   The location of a facility can be found by going to the API link in the same file, finding the facility you want to track in the response object, and copying it's id. Sublocations are the 'subLocs' a facility might have, like the Library's different floors--these will be tracked if you set trackSubLocations to true.
   

3. **Build and Run the Docker Container:**
   - Build the app with:
     ```
         docker-compose up
     ```

### Schema Overview

Our database schema includes three primary models: `Facility`, `SubFacility`, and `FacilityRecord`. `Facilities` represent the main locations being tracked, while `SubFacilities` account for specific areas within or related to these main locations. This distinction is necessary due to some `SubFacilities` sharing an id with some `Facilities` in the API, requiring separate handling.

### FacilityRecord Model

The `FacilityRecord` model captures detailed occupancy and availability data at specific timestamps:

- `id`: A unique identifier for each record.
- `createdAt`: The timestamp when the data was recorded.
- `numberOfPeople`: The count of people in the facility/subfacility.
- `capacity`: The total capacity of the facility/subfacility.
- `wasAvailable`: Indicates whether the facility/subfacility was available at the time of writing.
- `fullness`: A calculated ratio of `numberOfPeople` to `capacity`, representing how full the facility/subfacility is.
- `facilityId`: Links the record to a `Facility`.
- `subFacilityId`: (Optional) Links the record to a `SubFacility`, if applicable.

