import { FacilityRecord, PrismaClient, SubFacility } from "@prisma/client";
import { Facility } from "@prisma/client";
import { pstDateToUtcRange } from "./util.js";

interface FacilityAPI {
    getFacilityRecords: (facilityId: number, day: number, month: number, year: number) => Promise<FacilityRecord[]>
    getFacilities: () => Promise<Facility[]>
    getSubfacilities: (parentFacilityId: number) => Promise<SubFacility[]>
    cleanup: () => Promise<void>
}

export const facilityReader = (prisma: PrismaClient): FacilityAPI => {

    const getFacilityRecords= async (facilityId: number, day: number, month: number, year: number)  => {
       
        const [startTime, endTime] = pstDateToUtcRange(month,day,year)

        const records = await prisma.facilityRecord.findMany({
            where: {
                facilityId: {
                    equals: facilityId
                },
                createdAt: {
                    gte: startTime,
                    lte: endTime
                } 
            }
        }) 

        return records
    }

    const getSubfacilities = async (parentFacilityId: number) => {
        console.log("Querying")
        return await prisma.subFacility.findMany({
            where: {
                parentLocationId: parentFacilityId
            }
        })
    }

    const getFacilities = async () => {
        return await prisma.facility.findMany()
    }


    const cleanup = async () => {
        await prisma.$disconnect()
    }

    return {
        getFacilities,
        getFacilityRecords,
        cleanup,
        getSubfacilities
    }
}