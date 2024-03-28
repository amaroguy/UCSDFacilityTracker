import { useEffect } from "react"
import { Facility } from "../types/types"



interface FacilitySelectorProps {
    currentFacility: Facility | undefined,
    currentSubfacility: Facility | undefined,
    facilities:  Facility[]
    subfacilities: Facility[] | undefined,
    areSubfacilitiesLoading: boolean
    onFacilityChange: (newFacility: Facility | undefined) => any
    onSubfacilityChange: (newFacility: Facility | undefined) => any
}

export const FacilitySelector = ({currentFacility, facilities, subfacilities, onFacilityChange, onSubfacilityChange, currentSubfacility, areSubfacilitiesLoading}: FacilitySelectorProps) => {

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
        if(!subfacilities) {
            return
        }
        onSubfacilityChange(subfacilities.find(({id: fid}) => fid == Number(e.target.value)))
    }

    //Default to the first facility in each list
    useEffect(() => {
        if(!currentFacility){
            onFacilityChange(facilities[0])
            currentFacility = currentFacility ?? facilities[0]
        }
    }, [])

    useEffect(() => {
        if(subfacilities){
            onSubfacilityChange(undefined)
        }
    }, [subfacilities])

    return <>
        <h2> Facility </h2>

        <select onChange={facilityChangeHandler}>
            {facilities.map(buildDropdownOption)}
        </select>

        {
            areSubfacilitiesLoading ?
            <p> Loading subfacilities... </p> : 
            <select onChange={subfacilityChangeHandler} value={currentSubfacility?.id}>
                <option value=""> No Specific Floor </option>
                {subfacilities && subfacilities.map(buildDropdownOption)}
            </select>
        }
    </>
}