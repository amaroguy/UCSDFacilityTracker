export interface Facility {
    id: number
    name: string
}

export interface Subfacility extends Facility {
    parentFacilityId: number
}

//TODO - finish interface
export interface FacilityRecord {
    name: string
}