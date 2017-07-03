import { TestBed, inject } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { BeerService } from './beer.service';

describe('BeerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      providers: [
        BeerService,
        { provide: XHRBackend, useClass: MockBackend}]
    });
  });

  it('should be created', inject([BeerService], (service: BeerService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created with http dependency', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new BeerService(http);
    expect(service instanceof BeerService).toBe(true, 'new service should be ok');
  }));  

  describe('when get all Beers', () => {
    let backend: MockBackend;
    let service: BeerService;
    let fakeBeers = [];    
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new BeerService(http);
      fakeBeers = [];
      let options = new ResponseOptions({status: 200, body: {data: fakeBeers}});
      response = new Response(options);
    }))
  })
});
