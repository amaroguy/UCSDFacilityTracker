import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js"
import CustomParseFormat from 'dayjs/plugin/customParseFormat.js'
import utc from "dayjs/plugin/utc.js"
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { FacilityRecordRequest } from "./types/types";

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(CustomParseFormat)

export function pstDateToUtcRange(year: number, month: number, day: number) {
    // Convert the month to 0-indexed to match JavaScript Date and dayjs behavior
    month -= 1;
  
    // Specify the timezone for the input date
    const tz = 'America/Los_Angeles'; // PST/PDT timezone
  
    // Start of the day in PST
    let startDate = dayjs.tz(`${year}-${month + 1}-${day} 00:00:00`, tz);

    // Convert start of the day in PST to UTC
    let startDateUTC = startDate.utc().format();
  
    // End of the day in PST
    let endDate = dayjs.tz(`${year}-${month + 1}-${day} 23:59:59`, tz);
    // Convert end of the day in PST to UTC
    let endDateUTC = endDate.utc().format();

    return [startDateUTC, endDateUTC]
}

export function isValidDate(year: number, month: number, day: number){
    return dayjs(`${year}-${month}-${day}`, ['YYYY-M-D'], true).isValid()
    
}

export function validateFacilityRecordRequestInput(req: FastifyRequest<FacilityRecordRequest>, res: FastifyReply, done: HookHandlerDoneFunction) {
    const {month, day, year} = req.query
    const {facilityId} = req.params
    
    if(!month || !day || !year || !facilityId){
        res.status(400)
        res.send("Missing inputs")

        return res
    }

    if(!isValidDate(year,month,day)){
        res.status(400)
        res.send("Invalid Date!")

        return res
    }

    done()
}