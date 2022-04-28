import { IHotelImage } from "../../models/hotel";
import { ResultCard } from "../card/card";
import "./card-results.css";

export const CardResults = (results: any) => {
    return(
    <div className='cardres'>
        {results && results.results.map((x: { totalPrice: number, pricePerPerson: number, hotel: {id: string, name: string, content: {starRating: string, hotelFacilities: string[], images: IHotelImage[]}} }) =>{
        console.log(x);
        return <ResultCard key={'result'+x.hotel.id} hotelResult={x}/>})}
    </div>
        )
}