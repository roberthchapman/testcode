import { IHotelResult } from "../../models/hotel";
import NumberFormat from 'react-number-format';
import { FaStar } from "react-icons/fa";
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
                        Star Rating: {new Array(Number(hotelResult.hotel.content.starRating)).fill(null)
                        .map(() => (<FaStar/>))}
                    </div>
                </div>
                <div>Hotel Facilities{hotelResult.hotel.content.hotelFacilities.map(x => <div><div className="chip" key={x}><div className="chip-content">{x} </div></div></div>)}</div>
           </div>)
}