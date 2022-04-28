import { IHotelResult } from "../../models/hotel";
import NumberFormat from 'react-number-format';
import "./card.css";

interface IProps {
    hotelResult: IHotelResult
}

export const ResultCard = ({hotelResult}: IProps) => {
    const currencySymbol = '£';
    return(<div className="card" key={hotelResult.hotel.id}>
                <div>
                    <div><b>{hotelResult.hotel.name}</b></div>
                    <div className="image">
                        <img src={hotelResult.hotel.content.images[0].RESULTS_CAROUSEL.url} />
                    </div>
                </div>
                <div>
                    <div>
                        Price Per Person:
                        <NumberFormat value={hotelResult.pricePerPerson} thousandSeparator decimalScale={2} prefix={currencySymbol} displayType='text' />
                    </div>
                    <div>
                        Total Price:
                        <NumberFormat value={hotelResult.totalPrice} thousandSeparator decimalScale={2} prefix={currencySymbol} displayType='text' />
                    </div>
                    <div>
                        Star Rating:
                        <span>{hotelResult.hotel.content.starRating}</span>
                    </div>
                </div>
                <div>Hotel Facilities{hotelResult.hotel.content.hotelFacilities.map(x => <div key={x}>{x} </div>)}</div>
           </div>)
}