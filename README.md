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
   - Build your Docker container with the following command:
     ```
     docker build -t your-image-name .
     ```
   - Run your Docker container using:
     ```
     docker run -d --name your-container-name your-image-name
     ```
