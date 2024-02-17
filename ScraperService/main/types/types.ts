type LocationTrackingSetupOptions = {
    trackSublocations: boolean
}

type LocationTrackingSetup = {
    [id: string]: LocationTrackingSetupOptions
}

type WaitzAPIResponse = {
    data: WaitzFacilityData[]
}

type WaitzFacilityData = {
    name: string,
    id: number,
    busyness: number,
    people: number,
    isAvailable: boolean,
    capacity: number,
    hourSummary: string,
    isOpen: boolean,
    percentage: 0.48,
    subLocs?: WaitzFacilityData[]
    abbreviation?: string,
}

type FacilitySummary = {
    name: string,
    busyness: number,
    people: number,
    capacity: number;
    isAvailable: boolean;
    isOpen: boolean;
    hourSummary: string;
    id: number;
    subId?: number;
}