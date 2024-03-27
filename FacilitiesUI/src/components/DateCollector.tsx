import { DateSelector } from "./DateSelector"


interface DateCollectorProps {
    dates: Date[]
    setDates: React.Dispatch<React.SetStateAction<Date[]>>
}

export const DateCollector = ({dates, setDates}:DateCollectorProps) => {

    //Add a new date to the list
    const editDate = (newDate: Date, targetIdx: number) => {
        setDates((oldDates) => {
            return oldDates.map((currentDate, currentIdx) => {
                if(currentIdx === targetIdx){
                    return newDate
                }

                return currentDate
            })
        })
    }

    const addDate = () => setDates((dates) => [...dates, new Date()])
    const removeDate = (targetIdx: number) => setDates((dates) => dates.filter((_, idx) => idx !== targetIdx) )

    return <>
        <p> Dates </p>
        <button onClick={addDate}> Add Date </button>
        { dates.map((d, i) => <DateSelector onDateChange={(d: Date) => editDate(d, i)} date={d} onRemoveDate={() => removeDate(i)}/>) }
    </>

}