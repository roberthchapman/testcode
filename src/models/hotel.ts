export interface IHotelResult {
    totalPrice: number; 
    pricePerPerson: number;
    hotel: IHotel;
}

export interface IHotel {
    id: string;
    name: string;
    content: IHotelContent;
}

export interface IHotelContent {
    starRating: string;
    hotelFacilities: string[];
    images: IHotelImage[];
}

export interface IHotelImage {
    RESULTS_CAROUSEL: IImageUrl;
}

export interface IImageUrl {
    url: string;
}