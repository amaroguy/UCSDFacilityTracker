export interface Facility {
    id: number
    name: string
}

export interface Subfacility extends Facility {
    parentFacilityId: number
}

export interface FacilityRecord {
    capacity: number,
    createdAt: string,
    facilityId: number,
    id: number,
    fullness: number,
    numberOfPeople: number,
    subFacilityId?: number,
    wasAvailable: boolean
}