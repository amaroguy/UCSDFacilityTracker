import { ChangeEventHandler, useEffect } from "react"
import { Facility } from "../types/types"



interface DropdownProps {
    currentFacility: Facility | undefined,
    currentSubfacility: Facility | undefined,
    facilities:  Facility[]
    subfacilities: Facility[] | undefined,
    areSubfacilitiesLoading: boolean
    onFacilityChange: (newFacility: Facility | undefined) => any
    onSubfacilityChange: (newFacility: Facility | undefined) => any
}

export const FacilitySelector = ({currentFacility, facilities, subfacilities, onFacilityChange, onSubfacilityChange, currentSubfacility, areSubfacilitiesLoading}: DropdownProps) => {

    const buildDropdownOption = ({id, name}: Facility) => (
        <option key={id} value={id}> {name} </option>
    )

    const facilityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const facility = facilities.find(({id: fid}) => fid == Number(e.target.value))

        if(!facility){
            console.log("Didnt find the selected facility")
        }

        onFacilityChange(facility)
        onSubfacilityChange(undefined)
    }
    
    const subfacilityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(!subfacilities) {return}
        onSubfacilityChange(subfacilities.find(({id: fid}) => fid == Number(e.target.value)))
    }

    useEffect(() => {
        if(!currentFacility){
            onFacilityChange(facilities[0])
            currentFacility = currentFacility ?? facilities[0]
        }
    }, [])

    useEffect(() => {
        if(subfacilities){
            onSubfacilityChange(subfacilities[0])
        }
    }, [subfacilities])

    return <>
        <h2> Facility </h2>

        <select onChange={facilityChangeHandler} value={currentFacility?.id ?? undefined}>
            {facilities.map(buildDropdownOption)}
        </select>

        {
            areSubfacilitiesLoading ?
            <p> Loading subfacilities... </p> : 
            <select onChange={subfacilityChangeHandler}>
                {subfacilities && subfacilities.map(buildDropdownOption)}
            </select>
        }
    </>
}