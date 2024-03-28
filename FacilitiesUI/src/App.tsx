import { useState } from 'react'
import './App.css'
import { facilitiesService } from './services/FacilitiesService'
import { useQueries, useQuery } from '@tanstack/react-query'
import { FacilitySelector } from './components/FacilitySelector'
import { Facility } from './types/types'
import { DateCollector } from './components/DateCollector'
import { FacilityChart } from './components/Chart'

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

  const recordsQueries = useQueries({
    queries: dates.map((d) => {
      const month = d.getMonth() + 1
      const day =  d.getDate()
      const year = d.getFullYear()

      return {
        queryKey: ['records', currentFacility, currentSubfacility, month, day, year],
        queryFn: () => facilityService.fetchFacilityRecords(currentFacility?.id as number, day, month, year, currentSubfacility?.id),
        enabled: !!currentFacility && dates.length > 0
      }
    }),
    
  })

  console.log(recordsQueries.forEach((rq) => console.log(rq.data)))
  console.log(recordsQueries.length)

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

  const isChartDataLoading = recordsQueries.some((rq) => rq.isLoading)
  
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
      <FacilityChart data={recordsQueries} isChartDataLoading={isChartDataLoading} />
    </div>
  )
}

export default App
