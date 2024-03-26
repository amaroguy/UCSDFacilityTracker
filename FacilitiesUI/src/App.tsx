import { useState } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import { facilitiesService } from './services/FacilitiesService'
import { useQuery } from '@tanstack/react-query'
import { FacilitySelector } from './components/FacilitySelector'
import { Facility } from './types/types'

function App() {
  const [date, setDate] = useState(new Date())
  const [currentFacility, setCurrentFacility] = useState<Facility | undefined>()

  const facilityService = facilitiesService()

  const {
    isPending: isFacilityListPending, 
    error: isFacilityListError, 
    data: facilityList
  } = useQuery({
    queryKey: ["FacilitiesList"],
    queryFn: () => facilityService.fetchFacilities()
  })

  console.log(isFacilityListPending, isFacilityListError, facilityList)

  const onCalendarChange = (nextDate: any) => {
    console.log(nextDate)
  }


  if(isFacilityListPending){
    return "Im loading!"
  }

  if(!facilityList){
    return "The list is null"
  }

  return (
    <div>
      <FacilitySelector onChange={(e) => console.log(e)} facilities={facilityList}/>
      <Calendar onChange={onCalendarChange} value={date}/>
    </div>
  )
}

export default App
