import { FacilityRecord } from "./types/types";

let BASE_URL = ""

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    BASE_URL = "http://localhost:3050";
} else {
    BASE_URL = window.location.origin; 
}

//dates are stored in utc, so convert to pst and extract hh:mm PM timestamp
//https://stackoverflow.com/questions/13854105/convert-javascript-date-object-to-pst-time-zone
function extractHourAndMinutePST(utcTimestamp: string): string {
    // Create a Date object from the UTC timestamp
    const date = new Date(utcTimestamp);
  
    // Use Intl.DateTimeFormat to format the date in Pacific Time, including considerations for DST
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use 24-hour format, set to true if you prefer AM/PM
    });
  
    // Extract and format the time in PST
    const pstTime = formatter.format(date);
  
    return pstTime; // Returns the hour and minute in PST
  }

const cleanFacilityRecord = (fr: FacilityRecord) => {
    const {createdAt, fullness} = fr
    
        //data - percentage
        //labels - timestamp eg. 8:30PM

    return {y: fullness, x: extractHourAndMinutePST(createdAt)}
}

//https://www.chartjs.org/docs/latest/general/data-structures.html 
const facilityRecordsToChartJSData = (records: FacilityRecord[]) => {
    
    console.log("CLEANING", records)

    return records.map(cleanFacilityRecord)
}

export {BASE_URL, facilityRecordsToChartJSData}
