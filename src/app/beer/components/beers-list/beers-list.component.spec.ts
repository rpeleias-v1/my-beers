import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { BeersListComponent } from './beers-list.component';
import { BeerService} from '../../services/beer.service';

import { mockBeers } from '../../mock-beers';

describe('BeersListComponent', () => {
  let component: BeersListComponent;
  let fixture: ComponentFixture<BeersListComponent>;
  let beerService: BeerService;
  let getAllSpy;  
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BeerService], 
      declarations: [ BeersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersListComponent);
    component = fixture.componentInstance;    
    beerService = fixture.debugElement.injector.get(BeerService);
    nativeElement = fixture.nativeElement;    
    getAllSpy = spyOn(beerService, 'getAll').and.returnValue(Promise.resolve(mockBeers))    
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    fixture.detectChanges();
    let h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.innerHTML).toEqual("Beers List");
    expect(getAllSpy.calls.any()).toBe(true, 'getAll called');
  });

  it('should display beers in a table', async(done: any) => {   
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let trs = nativeElement.querySelectorAll('tbody tr');
      expect(getAllSpy.calls.any()).toBe(true, 'getAll called');
      expect(trs.length).toBe(4);
      expect(component.beers.length).toBe(4);
      done();
    });    
  });

  it('should select a beer', async(done: any) => {   
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      expect(getAllSpy.calls.any()).toBe(true, 'getAll called');  
      expect(component.beers.length).toBe(4);
      let trs = nativeElement.querySelectorAll('tbody tr');
      trs[1].click();      
      expect(component.selectedBeer).not.toBeUndefined();
      expect(component.selectedBeer.id).toBe(2);
      expect(component.selectedBeer.name).toBe('Alcohol Free');
      expect(component.selectedBeer.brand).toBe('Erdinger');
      expect(component.selectedBeer.nationality).toBe('Germany');
      expect(component.selectedBeer.alcoholPercentage).toBe(4);
      done();
    });    
  });

  it('should display delete button', async(done: any) => {   
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      expect(getAllSpy.calls.any()).toBe(true, 'getAll called');  
      expect(component.beers.length).toBe(4);
      let deleteButton = fixture.debugElement.query(By.css('button'));
      expect(deleteButton).toBeNull();
      let trs = nativeElement.querySelectorAll('tbody tr');
      trs[1].click();
      fixture.detectChanges();
      deleteButton = fixture.debugElement.query(By.css('button'));
      expect(deleteButton).not.toBeNull();      
      done();
    });    
  }); 
});
