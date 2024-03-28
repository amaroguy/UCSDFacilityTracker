export interface FacilityRecordRequest {
    Params: {
        facilityId: number
    }
    Querystring: {
        day: number
        month: number
        year: number
        subfacilityId?: number
    }
}

export interface SubfacilityRequest {
    Params: {
        facilityId: number
    }
}
