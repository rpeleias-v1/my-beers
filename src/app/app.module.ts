import { BrowserModule } from '@angular/platform-browser';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BeersListComponent } from './beer/components/beers-list/beers-list.component';
import { InMemoryBeerService } from './in-memory-beer-service';
import { BeerService } from './beer/services/beer.service';
import { BeersCreateComponent } from './beer/components/beers-create/beers-create.component';

@NgModule({
  declarations: [
    AppComponent,
    BeersListComponent,
    BeersCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryBeerService)
  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
