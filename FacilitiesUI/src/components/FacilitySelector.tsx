import { ChangeEventHandler } from "react"
import { Facility } from "../types/types"



interface DropdownProps {
    facilities:  Facility[]
    onChange: (newFacility: Facility | undefined) => any
}

export const FacilitySelector = ({facilities, onChange}: DropdownProps) => {

    const buildDropdownOption = ({id, name}: Facility) => (
        <option key={id} value={id}> {name} </option>
    )

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(facilities.find(({id: fid}) => fid == Number(e.target.value)))
    }

    return <>
        <select onChange={changeHandler}>
            {facilities.map(buildDropdownOption)}
        </select>
    </>
}