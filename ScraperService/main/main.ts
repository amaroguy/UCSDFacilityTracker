import { fetchTrackedLocations } from "./waitzData.js"
import { createFacilityWriter } from "./db.js"
import schedule from "node-schedule"
import prisma from "./prisma.js"
const facilityWriter = createFacilityWriter(prisma)

process.on('SIGINT', async function () { 
    await prisma.$disconnect()
    await schedule.gracefulShutdown()

    console.log("Successfully Exited")
    process.exit(0)
})

schedule.scheduleJob({tz: "America/Los_angeles", rule: "*/30 * * * *"}, async () => {    
    const timestamp = new Date().toISOString()
    
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






