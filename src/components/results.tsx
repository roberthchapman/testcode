import React from 'react';

export const Results = (results: any) => {
    return(
        <div>
            <table>
                <thead>
                    <th>Hotel Name</th>
                    <th>Price per Person</th>
                    <th>Total Price</th>
                    <th>Star Rating</th>
                </thead>
                <tbody>
            {results && results.results.map((x: { id: string, totalPrice: number, pricePerPerson: number, hotel: {name: string, content: {starRating: string}} }) =>
                <tr key={x.id}>
                    <td>{x.hotel.name}</td>
                    <td>{x.pricePerPerson}</td>
                    <td>{x.totalPrice}</td>
                    <td>{x.hotel.content.starRating}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}