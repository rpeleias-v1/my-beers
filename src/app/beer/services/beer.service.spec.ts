import { TestBed, inject } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions, BaseRequestOptions, RequestOptions
} from '@angular/http';

import { BeerService } from './beer.service';

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

  describe('when get all Beers', () => {
    let backend: MockBackend;
    let service: BeerService;    

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);     
    });

    it('should cal getAll() to get all Beers', (done) => {
      let mockBeers = [];
      backend.connections.subscribe((connection: MockConnection) => {        
        let options = new ResponseOptions({ body:{ data: mockBeers }});
        connection.mockRespond(new Response(options));        
      });

      service.getAll().then((response) => {
        expect(response).toBe(mockBeers);
        done();
      })
    })
  })
});
