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
import { Beer } from '../models/beer';

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

  describe('when get a single beer', () => {
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

  describe('when post a single beer', () => {
    let backend: MockBackend;
    let service: BeerService;  
    let newBeer: Beer;

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);     
      newBeer = new Beer(); 
      newBeer.id = 5;
      newBeer.name = 'Skol';
      newBeer.brand = 'Skol';
      newBeer.nationality = 'Brazil';
      newBeer.alcoholPercentage = 4;

      backend.connections.subscribe((connection: MockConnection) => {            
        let newBeer = JSON.parse(connection.request.getBody());
        mockBeers.push(newBeer);
        let options = new ResponseOptions({ body: { data: newBeer }, status: 204});
        connection.mockRespond(new Response(options));        
      });
    });
    
    it('should call post() to insert a new beer', (done) => {     
      service.post(newBeer).then((response) => {
        expect(response.status).toBe(204);
        expect(mockBeers.length).toBe(5);
        expect(mockBeers[4].id).toBe(newBeer.id);
        expect(mockBeers[4].name).toBe(newBeer.name);
        expect(mockBeers[4].brand).toBe(newBeer.brand);
        expect(mockBeers[4].nationality).toBe(newBeer.nationality);
        expect(mockBeers[4].alcoholPercentage).toBe(newBeer.alcoholPercentage);
        done();
      });
    });    
  });

  describe('when put a single beer', () => {
    let backend: MockBackend;
    let service: BeerService;  
    let updateBeer: Beer;

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);     
      updateBeer = new Beer(); 
      updateBeer.id = 2;
      updateBeer.name = 'Skol';
      updateBeer.brand = 'Skol';
      updateBeer.nationality = 'Brazil';
      updateBeer.alcoholPercentage = 4;

      backend.connections.subscribe((connection: MockConnection) => {            
        let newBeer = JSON.parse(connection.request.getBody());
        let beerId = connection.request.url.split('/')[2];          
        let options: ResponseOptions;
        options = new ResponseOptions({ body: { data: mockBeers }, status: 404});
        mockBeers.forEach((beer: Beer, index: number) => {
          if(beer.id === Number(beerId)) {
            mockBeers[index] = updateBeer;
            options = new ResponseOptions({ body: { data: mockBeers }, status: 201});  
          }
        });         
        connection.mockRespond(new Response(options));        
      });
    });
    
    it('should call put() to update an existing beer beer', (done) => {     
      service.put(2, updateBeer).then((response) => {
        expect(response.status).toBe(201);
        expect(mockBeers[1].id).toBe(updateBeer.id);
        expect(mockBeers[1].name).toBe(updateBeer.name);
        expect(mockBeers[1].brand).toBe(updateBeer.brand);
        expect(mockBeers[1].nationality).toBe(updateBeer.nationality);
        expect(mockBeers[1].alcoholPercentage).toBe(updateBeer.alcoholPercentage);
        done();
      });
    }); 

    it('should call put() to not update an existing beer beer', (done) => {     
      service.put(6, updateBeer).then((response) => {
        expect(response.status).toBe(404);
        expect(mockBeers.length).toBe(5);        
        done();
      });
    });    
  });

  describe('when delete a single beer', () => {
    let backend: MockBackend;
    let service: BeerService;      

    beforeEach(() => {
      backend = TestBed.get(MockBackend);
      service = TestBed.get(BeerService);           

      backend.connections.subscribe((connection: MockConnection) => {            
        let newBeer = JSON.parse(connection.request.getBody());
        let beerId = connection.request.url.split('/')[2];                  
        let options = new ResponseOptions({ body: { data: mockBeers }, status: 404});
        mockBeers.forEach((beer: Beer, index: number) => {
          if(beer.id === Number(beerId)) {
            mockBeers.splice(index, 1);
            options = new ResponseOptions({ body: { data: mockBeers }, status: 204});
          }
        });        
        connection.mockRespond(new Response(options));        
      });
    });
    
    it('should call dele() to delete an existing beer beer', (done) => {     
      service.delete(2).then((response) => {
        expect(response.status).toBe(204);
        expect(mockBeers.length).toBe(4);        
        done();
      });
    }); 

    it('should call delete() to delete an invalid beer', (done) => {     
      service.delete(6).then((response) => {
        expect(response.status).toBe(404);
        expect(mockBeers.length).toBe(4);        
        done();
      });
    });    
  });
});
