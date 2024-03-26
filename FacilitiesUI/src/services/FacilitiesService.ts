
import { BASE_URL } from "../utils"
import type { Facility, FacilityRecord } from "../types/types"


interface FacilitiesService {
    fetchFacilities: () => Promise<Facility[]>
    fetchFacilityRecords: (facilityId: number, day: number, month: number, year: number) => Promise<FacilityRecord[]> 
    fetchSubfacilities: (parentFacilityId: Facility) => Promise<any[]>
}

// const test_facilities = [{facilityId: 1, facilityName: "geisel"}, {facilityId: 2, facilityName: "rimac"}] as Facility[]
// const test_records = [{name: "foo"}] as FacilityRecord[]

console.log(BASE_URL)

export const facilitiesService = (): FacilitiesService => {
    const fetchFacilities = async () => {
        console.log("Fetching Facilities...")

        return fetch(`${BASE_URL}/facilities`).then(res => res.json())
    }

    const fetchFacilityRecords = async (facilityId: number, day: number, month: number, year: number) => {
        return fetch(`${BASE_URL}/records/${facilityId}?day=${day}&month=${month}&year=${year}`).then(res => res.json())
    }

    const fetchSubfacilities = async (parentFacility: Facility) => {
        console.log("Fetching subfacilities of", parentFacility)
        return fetch(`${BASE_URL}/facilities/${parentFacility.id}`).then(res => res.json())
    }

    return {
        fetchFacilities,
        fetchFacilityRecords,
        fetchSubfacilities
    }
}