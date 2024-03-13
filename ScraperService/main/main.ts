import { fetchTrackedLocations } from "./waitzData.js"
import { createFacilityWriter } from "./db.js"
import schedule from "node-schedule"
import prisma from "./prisma.js"
const facilityWriter = createFacilityWriter(prisma)

const rule = new schedule.RecurrenceRule();
rule.minute = 30;
rule.tz = "America/Los_Angeles"

process.on('SIGINT', async function () { 
    await prisma.$disconnect()
    await schedule.gracefulShutdown()

    console.log("Successfully Exited")
    process.exit(0)
})

schedule.scheduleJob(rule, async () => {    
    const timestamp = new Date()
    let facilitySummaries = await fetchTrackedLocations()
    
    for(let facilitySummary of facilitySummaries){
    
        if(!facilitySummary) continue    
        for(let facilityRecord of facilitySummary){
    
            if(!facilityRecord.isOpen) continue
    
            await facilityWriter.writeFacilityRecord(
                {
                    createdAt: timestamp,
                    numberOfPeople: facilityRecord.people,
                    capacity: facilityRecord.capacity,
                    wasAvailable: facilityRecord.isAvailable,
                    fullness: facilityRecord.busyness,
                    facilityId: facilityRecord.id,
                    subFacilityId: facilityRecord.subId
                }
            )
        }
    
    }
})






