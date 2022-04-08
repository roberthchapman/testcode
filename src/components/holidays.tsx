import { Filters, Results, Search } from ".";
import axios from 'axios';
import { createSearch } from "../models/search";
import React from "react";

export const Holidays = () => {
    const [results, setResults] = React.useState<any[]>([]);
    const [filterFacilities, setFilterFacilities] = React.useState<string>('');
    const [filterPrice, setFilterPrice] = React.useState<number>(0);
    const [filterStars, setFilterStars] = React.useState<number>(1);

    const filteredResults = results && 
    results.filter(x => filterPrice === 0 || x.pricePerPerson < filterPrice)
    .filter(y => Number(y.hotel.content.starRating) >= filterStars)
    .filter(x => x.hotel.content.hotelFacilities.includes(filterFacilities) || filterFacilities === '');

    const onSearch = (location: string, date: Date) => {
        axios.post('https://www.virginholidays.co.uk/cjs-search-api/search', createSearch(location, date))
        .then(x => {
          const res = x.data.holidays;  
          setResults(res);
        });
    }

    const onChangeSearch = () => {
        setResults([]);
    }

    const onFilterFacilities = (facilities: string) => {
        setFilterFacilities(facilities);
    }

    const onFilterPrice = (price: number) => {
        setFilterPrice(price);
    }

    const onFilterStars = (stars: number) => {
        setFilterStars(stars);
    }

    return(
        <div>
            <Search onSearch={onSearch} onChangeSearch={onChangeSearch}/>
            {results && results.length > 0 &&
            <div>
                <Filters onFilterFacilities={onFilterFacilities} 
                    onFilterPrice={onFilterPrice}
                    onFilterStars={onFilterStars}
                    facility={filterFacilities}
                    price={filterPrice}
                    stars={filterStars}/>
                <Results results={filteredResults}/>
            </div>
            }
        </div>
    )
}