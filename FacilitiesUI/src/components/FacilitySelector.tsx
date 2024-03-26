import { ChangeEventHandler, useEffect } from "react"
import { Facility } from "../types/types"



interface DropdownProps {
    currentFacility: Facility | undefined
    facilities:  Facility[]
    subfacilities: Facility[] | undefined
    onChange: (newFacility: Facility | undefined) => any
}

export const FacilitySelector = ({currentFacility, facilities, subfacilities, onChange}: DropdownProps) => {

    const buildDropdownOption = ({id, name}: Facility) => (
        <option key={id} value={id}> {name} </option>
    )

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(facilities.find(({id: fid}) => fid == Number(e.target.value)))
    }

    console.log("CURRENTFACILITY", currentFacility)
    console.log("SUBFACILITIES", subfacilities)

    useEffect(() => {
        onChange(facilities[0])
        currentFacility = currentFacility ?? facilities[0]
    }, [])

    console.log("Changed the current facility to", currentFacility)

    return <>
        <h2> Facility </h2>
        
        <select onChange={changeHandler} value={currentFacility?.id ?? undefined}>
            {facilities.map(buildDropdownOption)}
        </select>

        {
            <select>
                {subfacilities && subfacilities.map(buildDropdownOption)}
            </select>
        }
    </>
}