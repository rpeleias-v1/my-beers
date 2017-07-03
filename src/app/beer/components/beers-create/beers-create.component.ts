import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../models/beer';
import { Router } from '@angular/router';

@Component({
  selector: 'beers-create',
  templateUrl: './beers-create.component.html',
  styleUrls: ['./beers-create.component.css']
})
export class BeersCreateComponent implements OnInit {

  private beer: Beer;

  constructor(private beerService: BeerService, private router: Router) { }

  ngOnInit() {
    this.beer = new Beer();
  }

  save() {
    this.beerService.post(this.beer)
      .then(response => {
        console.log(response);
        this.router.navigate(['/beers']);
      });
  }

  returnList() {
    this.router.navigate(['/beers']);
  }

}
