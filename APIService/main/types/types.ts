export interface FacilityRecordRequest {
    Params: {
        facilityId: number
    }
    Querystring: {
        day: number
        month: number
        year: number
    }
}

export interface SubfacilityRequest {
    Params: {
        subfacilityId: number
    }
}
