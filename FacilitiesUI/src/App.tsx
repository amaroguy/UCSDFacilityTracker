import { useState } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import { FacilitySelector } from './components/FaciliitySelector'
import { facilitiesService } from './services/FacilitiesService'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [date, setDate] = useState(new Date())
  const facilityService = facilitiesService()

  const {isPending, error, data} = useQuery({
    queryKey: ["FacilitiesList"],
    queryFn: () => facilityService.fetchFacilities()
  })

  console.log(isPending, error, data)

  const onCalendarChange = (nextDate: any) => {
    console.log(nextDate)
  }

  return (
    <div>
      <FacilitySelector/>
      <Calendar onChange={onCalendarChange} value={date}/>
    </div>
  )
}

export default App
