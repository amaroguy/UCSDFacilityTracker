import { PrismaClient, Prisma } from "@prisma/client"

export const createFacilityWriter = (prisma: PrismaClient) => {

    const writeFacilityRecord = async (facilityRecord: Prisma.FacilityRecordUncheckedCreateInput) => {
        await prisma.facilityRecord.create({
            data: facilityRecord
        })
    }
    
    const writeFacility = async (facility: Prisma.FacilityUncheckedCreateInput) => {
        await prisma.facility.create({
            data: facility
        })
    }    

    const writeSubFacility = async (subFacility: Prisma.SubFacilityUncheckedCreateInput) => {
        await prisma.subFacility.create({
            data: subFacility
        })
    }

    return {
        writeFacility,
        writeFacilityRecord,
        writeSubFacility
    }
}