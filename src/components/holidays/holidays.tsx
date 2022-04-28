import { Filters, Results, Search } from "../";
import axios from 'axios';
import { createSearch } from "../../models/search";
import React from "react";
import { CardResults } from "../card-results";
import './holidays.css';

export const Holidays = () => {
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    //the idea is to control the filtering from here since the filtered results will be passed down to the results component
    const [filterFacilities, setFilterFacilities] = React.useState<string>('');
    const [filterPrice, setFilterPrice] = React.useState<number>(0);
    const [filterStars, setFilterStars] = React.useState<number>(1);
    const [filteredFacilities, setFilteredFacilities] = React.useState<string[]>([]);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    //keep search results and filter results as separate so that filtering is an extension of searching
    //use useMemo so that the filtering is not run every time
    const filteredResults = React.useMemo(() => searchResults && 
    searchResults.filter(x => filterPrice === 0 || x.pricePerPerson < filterPrice)
    .filter(x => filteredFacilities.length === 0 || filteredFacilities.every(f => x.hotel.content.hotelFacilities.includes(f)))
    .filter(y => Number(y.hotel.content.starRating) >= filterStars)
    // .filter(x => x.hotel.content.hotelFacilities.includes(filterFacilities) || filterFacilities === '')
    , [searchResults, filterFacilities, filterPrice, filterStars, filteredFacilities]);

    const onSearch = (location: string, date: Date) => {
        setIsSearching(true);
        resetFilters();
        axios.post('https://www.virginholidays.co.uk/cjs-search-api/search', createSearch(location, date))
        .then(x => {
          const res = x.data.holidays;  
          setSearchResults(res);
          setIsSearching(false);
          setErrorMessage('');
        })
        .catch(x => {
            setErrorMessage(x.value);
        });
    }

    const resetFilters = () => {
        setFilterFacilities('');
        setFilterPrice(0);
        setFilterStars(1);
        setFilteredFacilities([]);
    }

    const onChangeSearch = () => {
        //ensure that changing search criteria means you don't still show old search results
        setSearchResults([]);
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

    const toggleFacilitiesFilter = (filter: string) => {
        let updatedFacilities = filteredFacilities.slice(0);
        if(updatedFacilities.includes(filter)){
            updatedFacilities = updatedFacilities.filter(x => x !== filter)
        } else {
            updatedFacilities.push(filter);
        }
        setFilteredFacilities(updatedFacilities);
    }

    return(
        <div>
            <h2>Holiday Search</h2>
            <Search onSearch={onSearch} onChangeSearch={onChangeSearch}/>
            {isSearching && <div>Searching...</div>}
            {!isSearching && searchResults && searchResults.length > 0 &&
            <div className="container">
                <Filters 
                    facility={filterFacilities}
                    price={filterPrice}
                    stars={filterStars}
                    onFilterPrice={onFilterPrice}
                    onFilterStars={onFilterStars}
                    toggleFacilitiesFilter={toggleFacilitiesFilter}/>
                <div>
                    <div className="header">
                        <h3>Results</h3>
                        <label>{`${filteredResults.length} result${filteredResults.length !== 1 ? 's':''} found`}</label>
                    </div>
                    <CardResults results={filteredResults}/>
                </div>
            </div>
            }
        </div>
    )
}