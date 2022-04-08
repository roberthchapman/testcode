import React from "react";
import { SelectFacilities } from "../models/hotel-facilities";

 interface IProps {
    onFilterFacilities: (facility: string) => void;
    onFilterPrice: (price: number) => void;
    onFilterStars: (stars: number) => void;
    facility: string;
    price: number;
    stars: number;
}

export const Filters = ({onFilterFacilities, onFilterPrice, onFilterStars, facility, price, stars}: IProps) => {

    const onChangePrice = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value.toString())) {
           onFilterPrice(Number(e.target.value));
        }
     }

    return(
        <div>
            <div>Filters:</div>
            <div>
            <label>Hotel Facilities:</label>
            <select
                value={facility}
                onChange={({ target: { value } }) => {onFilterFacilities(value);}}
            >
            {SelectFacilities.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
              })}
            </select>
            </div>
            <div>
                <label>Max Price per Person:</label><input type="string" value={price} onChange={onChangePrice}/>
            </div>
            <div>
                <label>Minimum Star Rating:</label><input type="number" value={stars} step={1} min={1} max={5} onChange={({ target: { value } }) =>{onFilterStars(Number(value))}}/>
            </div>
        </div>
    )
}