import { useState } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import { facilitiesService } from './services/FacilitiesService'
import { useQuery } from '@tanstack/react-query'
import { FacilitySelector } from './components/FacilitySelector'
import { Facility, Subfacility } from './types/types'
import { DateCollector } from './components/DateCollector'

function App() {
  const [currentFacility, setCurrentFacility] = useState<Facility | undefined>()
  const [currentSubfacility, setCurrentSubfacility] = useState<Facility | undefined>()
  const [dates, setDates] = useState<Date[]>([new Date()])

  const facilityService = facilitiesService()

  //TODO, CACHE FOR LIKE A WEEK?
  const {
    isPending: isFacilityListPending, 
    error: isFacilityListError, 
    data: facilityList
  } = useQuery({
    queryKey: ["FacilitiesList"],
    queryFn: () => facilityService.fetchFacilities()
  })

  //TODO, CACHE FOR LIKE A WEEK?
  const {
    isPending: isSubfacilityListPending,
    error: isSubfacilityListError,
    data: subfacilityList
  } = useQuery({
    queryKey: ["Subfacilities", currentFacility],
    queryFn: () => facilityService.fetchSubfacilities(currentFacility ?? (facilityList as Facility[])[0]),
    enabled: !!facilityList
  })

  // console.log("SUBFACILITIES", isSubfacilityListPending, isSubfacilityListError, subfacilityList)

  
  
  const onCalendarChange = (nextDate: any) => {
    console.log(nextDate)
  }
  
  
  if(isFacilityListPending){
    return "Im loading!"
  }
  
  if(!facilityList){
    return "The list is null"
  }
  
  console.log(currentSubfacility, "CSF")
  return (
    <div>
      <p> Current Facility: {JSON.stringify(currentFacility)}</p>
      <p> Current Subfacility: {JSON.stringify(currentSubfacility)}</p>

      <FacilitySelector 
        onFacilityChange={(e) => setCurrentFacility(e)} 
        onSubfacilityChange={(e) => setCurrentSubfacility(e)}
        areSubfacilitiesLoading={isSubfacilityListPending}
        facilities={facilityList} 
        subfacilities={subfacilityList}
        currentFacility={currentFacility}
        currentSubfacility={currentSubfacility}
      />
      <DateCollector dates={dates} setDates={setDates}/>
    </div>
  )
}

export default App
