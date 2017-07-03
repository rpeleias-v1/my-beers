import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Beer } from './beer/models/beer';

export class InMemoryBeerService implements InMemoryDbService {
    
    createDb() {            
        let beers: Beer[] = [
            this.createBeer(1, 'Corona', 'Corona', 'Mexico', 4.0),
            this.createBeer(2, 'Alcohol Free', 'Erdinger', 'Germany', 4.0),
            this.createBeer(3, 'Weiss Beer', 'Baden Baden', 'Brazil', 4.0),
            this.createBeer(4, 'Brahma', 'Brahma', 'Brazil', 4.0),
        ]
        return {beers};
    }

    private createBeer(id: number, name: string, brand: string, nationality: string, alcoholPercentage: number) {
        let beer = new Beer();
        beer.id = id;
        beer.name = name;
        beer.brand = brand;
        beer.nationality = nationality;
        beer.alcoholPercentage = alcoholPercentage;
        return beer;
    }
}