import { fetchTrackedLocations } from "./waitzData.js"
import { createFacilityWriter } from "./db.js"
import prisma from "./prisma.js"

const timestamp = new Date()
let facilitySummaries = await fetchTrackedLocations()
const facilityWriter = createFacilityWriter(prisma)

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
            }
        )
    }

}

await prisma.$disconnect()

