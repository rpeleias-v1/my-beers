import { Beer } from './models/beer';

export const mockBeers: Beer[] = [
    createBeer(1, 'Corona', 'Corona', 'Mexico', 4.0),
    createBeer(2, 'Alcohol Free', 'Erdinger', 'Germany', 4.0),
    createBeer(3, 'Weiss Beer', 'Baden Baden', 'Brazil', 4.0),
    createBeer(4, 'Brahma', 'Brahma', 'Brazil', 4.0),
];     


function createBeer(id: number, name: string, brand: string, nationality: string, alcoholPercentage: number) {
    let beer = new Beer();
    beer.id = id;
    beer.name = name;
    beer.brand = brand;
    beer.nationality = nationality;
    beer.alcoholPercentage = alcoholPercentage;
    return beer;
}   