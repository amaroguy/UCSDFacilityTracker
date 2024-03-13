import { fetchAllWaitzData, LOCS_TO_TRACK } from "../waitzData.js";
import { createFacilityWriter } from "../db.js";
import prisma from "../prisma.js";

//Make sure you've taken a look at the facilities you want to track, and written them down in waitzData.js
const allWaitzLocations = await fetchAllWaitzData()
const facilityWriter = createFacilityWriter(prisma)
const alreadySeededCheck = await prisma.facility.findFirst()


if (alreadySeededCheck) {
    console.log("Database is already seeded!")
    process.exit()
}


for(let location of allWaitzLocations){
    let {name, id: parentId} = location

    if(!LOCS_TO_TRACK[parentId]){
        console.log("not tracking", name)
        continue
    }
    
    console.log("tracking parent location", name, "with id", parentId)
    await facilityWriter.writeFacility({id: parentId, name})

    if(!LOCS_TO_TRACK[parentId].trackSublocations || !location.subLocs){
        continue
    }

    let subLocations = location.subLocs

    for(let {name, id: childId} of subLocations){
        console.log("tracking sublocation", name, "with childId", childId)
        await facilityWriter.writeSubFacility({id: childId, name, parentLocationId: parentId})
    }
}

await prisma.$disconnect()
