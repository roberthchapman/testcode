import React from "react";
import { HotelFacilities } from "../../models/hotel-facilities";
import "./filters.css";

 interface IProps {
    facility: string;
    price: number;
    stars: number;
    onFilterPrice: (price: number) => void;
    onFilterStars: (stars: number) => void;
    toggleFacilitiesFilter: (filter: string) => void;
}

export const Filters = ({facility, price, stars, onFilterPrice, onFilterStars, toggleFacilitiesFilter}: IProps) => {

    const onChangePrice = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value.toString())) {
           onFilterPrice(Number(e.target.value));
        }
     }

    return(
        <div className="filterContainer">
            <h3>Filters</h3>
            <div className="filter">
                <div>Hotel Facilities</div>
                {
                HotelFacilities.map((x, index) =>
                <div>
                    <input type="checkbox"
                        id={x.value}
                        value={x.value}
                        key={index}
                        onChange={(e) => toggleFacilitiesFilter(x.value)}
                    />
                    <label>{x.value}</label>
                </div>
                    )
                }
            </div>
            <div className="filter">
                <div>Maximum Price per Person</div>
                <input type="string" value={price} onChange={onChangePrice}/>
            </div>
            <div className="filter">
                <div>Minimum Star Rating</div>
                <input type="number" value={stars} step={1} min={1} max={5} onChange={({ target: { value } }) =>{onFilterStars(Number(value))}}/>
            </div>
        </div>
    )
}