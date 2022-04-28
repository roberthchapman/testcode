import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import { SelectLocations } from '../../models/locations';
import "../dropdown-style.css";
import "./search.css";

export interface IProps {
    onSearch: (location: string, date: Date) => void;
    onChangeSearch: () => void;
}

export const Search = ({onSearch, onChangeSearch}: IProps) => {
    const [location, setLocation] = React.useState<string>('');
    const [date, setDate] = React.useState<Date | null>(null);
    const [minDate] = React.useState<Date>(moment().add(1, 'd').toDate());

    const onClick = () => {
        if(location && date) {
            onSearch(location, date);
        }
    }

    return(
        <div className='search'>
            <select
                value={location}
                onChange={({ target: { value } }) => { setLocation(value); onChangeSearch();}}
                style={{ width: '200px'}}
            >
            {SelectLocations.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
              })}
            </select>
            <DatePicker
                dateFormat="dd/MM/yyyy" 
                placeholderText='Please select a date'
                selected={date ? date : null}
                minDate={minDate}
                onChange={(date: Date) => { setDate(date); onChangeSearch();}}
            />
            <button onClick={onClick} disabled={location.length === 0 || date === null}>Search</button>
        </div>
    )
}
