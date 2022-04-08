import moment from 'moment';

export interface ISearch {
    bookingType: string;
    location: string;
    departureDate: string;
    duration: number;
    partyCompositions: IPartyComposition[];
}

export interface IPartyComposition {
    adults: number;
    childAges: number[];
    infants: number;
}

export const createSearch = (location: string, date: Date): ISearch => ({
        bookingType: 'hotel',
        location: location,
        departureDate: moment(date).format("DD-MM-YYYY"),
        duration: 7,
        partyCompositions: [{
            adults: 2,
            childAges: [],
            infants: 0
        }]
});