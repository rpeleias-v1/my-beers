import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer';

@Component({
  selector: 'beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.css']
})
export class BeersListComponent implements OnInit {

  beers: Array<Beer>;
  errorMessage: string;
  selectedBeer: Beer

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.beerService.getAll().then(beers => {
      this.beers = beers
    })
    .catch(message => this.errorMessage = message);
  } 

  select(selectedBeer: Beer) {
    this.selectedBeer = selectedBeer;
  }

  delete() {
    this.beerService.delete(this.selectedBeer.id)
      .then(response => this.list())
  }

}
