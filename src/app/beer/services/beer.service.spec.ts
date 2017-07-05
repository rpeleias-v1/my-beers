import { TestBed, inject } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions, BaseRequestOptions, RequestOptions
} from '@angular/http';

import { BeerService } from './beer.service';
import { mockBeers } from '../mock-beers';

describe('BeerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [             
        BeerService,
        MockBackend, 
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },        
      ]
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

  describe('when get All Beers', () => {
    let backend: MockBackend;
    let service: BeerService;    

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);           
    });

    it('should cal getAll() to get all Beers', (done) => {      
      backend.connections.subscribe((connection: MockConnection) => {         
        let options = new ResponseOptions({ body:{ data: mockBeers }});
        connection.mockRespond(new Response(options));        
      });

      service.getAll().then((response) => {
        expect(response).toBe(mockBeers);
        done();
      })
    })
  });

  describe('when get s single beer', () => {
    let backend: MockBackend;
    let service: BeerService;    

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);     

      backend.connections.subscribe((connection: MockConnection) => {  
        let foundBeer;  
        let beerId = connection.request.url.split('/')[2];     
        mockBeers.forEach((beer) => {
            if(Number(beerId) === beer.id) {
              foundBeer = beer;
            }
        });      
        let options = new ResponseOptions({ body:{ data: foundBeer }});
        connection.mockRespond(new Response(options));        
      });
    });
    
    it('should cal get() to get single Beers', (done) => {     
      service.get(1).then((response) => {
        expect(response).toBe(mockBeers[0]);
        done();
      });
    });

    it('should cal get() to not get single Beers', (done) => {     
      service.get(5).then((response) => {
        expect(response).not.toBe(mockBeers[0]);
        done();
      });
    });
  });
});
