const WAITZ_URL = 'https://waitz.io/live/ucsd'
export const LOCS_TO_TRACK: LocationTrackingSetup = {
    "7": {trackSublocations: true},
    "8": {trackSublocations: true}
}

const cleanLocationData = ({name, busyness, people, capacity, isAvailable, isOpen, hourSummary}: WaitzFacilityData, parentLocationId: number, subLocationId?: number): FacilitySummary => ({name, busyness, people, capacity, isOpen, isAvailable, hourSummary, id: parentLocationId, subId: subLocationId})

export const fetchAllWaitzData = async (): Promise<WaitzFacilityData[]> => {
    const res = await fetch(WAITZ_URL)
    const { data } = await res.json()
    return data
}

export const fetchTrackedLocations = async (): Promise<(FacilitySummary[] | undefined)[]> => {
    const waitzData = await fetchAllWaitzData()

    return Object.entries(LOCS_TO_TRACK).map(([id, {trackSublocations}]) => {
        const currLoc = waitzData.find(facility => facility.id === Number(id))     
        
        if(!currLoc){
            console.log('Location with id', id, "dne")
            return
        }

        let mainSummary = [cleanLocationData(currLoc, currLoc.id)]
        let subLocSummary = [] as FacilitySummary[]
        
        if(!trackSublocations || !currLoc.subLocs){
            return mainSummary
        }

        subLocSummary = currLoc.subLocs.map((loc) => cleanLocationData(loc, currLoc.id, loc.id))

        return [...mainSummary, ...subLocSummary]
    })
}