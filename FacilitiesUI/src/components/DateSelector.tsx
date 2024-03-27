import { useState } from "react"
import Calendar from "react-calendar"

interface DateSelectorProps {
    date: Date,
    onDateChange: (newDate: Date) => any,
    onRemoveDate: () => any
}

export const DateSelector = ({date, onDateChange, onRemoveDate}: DateSelectorProps) => {

    const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    const toggleCalendar = () => setIsCalendarVisible(!isCalendarVisible)

    return <>
        <button onClick={toggleCalendar}> {date.toString()} </button> <button onClick={onRemoveDate}> Remove </button>
        {isCalendarVisible && <Calendar onChange={(d) => {onDateChange(d as Date); toggleCalendar();}} />}
    </> 
}