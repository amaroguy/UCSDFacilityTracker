
import { BASE_URL } from "../utils"

//TODO - finish interface
interface Facility {
    facilityId: number
    facilityName: string
}


//TODO - finish interface
interface FacilityRecord {
    name: string
}

interface FacilitiesService {
    fetchFacilities: () => Promise<Facility[]>
    fetchFacilityRecords: (facilityId: number, day: number, month: number, year: number) => Promise<FacilityRecord[]> 
}

// const test_facilities = [{facilityId: 1, facilityName: "geisel"}, {facilityId: 2, facilityName: "rimac"}] as Facility[]
// const test_records = [{name: "foo"}] as FacilityRecord[]

console.log(BASE_URL)

export const facilitiesService = (): FacilitiesService => {
    const fetchFacilities = async () => {
        return fetch(`${BASE_URL}/facilities`).then(res => res.json())
    }

    const fetchFacilityRecords = async (facilityId: number, day: number, month: number, year: number) => {
        return fetch(`${BASE_URL}/facilities/${facilityId}?day=${day}&month=${month}&year=${year}`).then(res => res.json())
    }

    return {
        fetchFacilities,
        fetchFacilityRecords
    }
}