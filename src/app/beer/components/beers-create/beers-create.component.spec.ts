import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { BeersCreateComponent } from './beers-create.component';
import { BeerService} from '../../services/beer.service';

describe('BeersCreateComponent', () => {
  let component: BeersCreateComponent;
  let fixture: ComponentFixture<BeersCreateComponent>;
  let beerService: BeerService;
  let router: Router;
  let nameInput;
  let brandInput;
  let nationalityInput;
  let alcoholPercentageInput;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule, 
        FormsModule, 
        RouterTestingModule.withRoutes([])],
      providers: [BeerService],
      declarations: [ BeersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersCreateComponent);
    component = fixture.componentInstance;
    beerService = fixture.debugElement.injector.get(BeerService);
    router = fixture.debugElement.injector.get(Router);
    router.initialNavigation();
    nameInput = fixture.nativeElement.querySelector('#beer_name');
    brandInput = fixture.nativeElement.querySelector('#beer_brand');
    nationalityInput = fixture.nativeElement.querySelector('#beer_nationality');
    alcoholPercentageInput = fixture.nativeElement.querySelector('#beer_alcohol_percentage');
    fixture.detectChanges();    
  });

  it('should display page title', () => {    
    let h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.innerHTML).toEqual("New Beer");
  });

  it('should initialize the component', () => {        
    expect(component.beer).not.toBeNull();
  });

  it('submit button should be disabled if fields are not filled', async() => { 
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let buttons = fixture.debugElement.queryAll(By.css('button'));    
      expect(buttons[1].nativeElement.disabled).toBeTruthy();
    });    
  });

  it('submit button should be enabled after fields are filled', async() => { 
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;    
      expect(submitButton.disabled).toBeTruthy();    
      nameInput.value = 'Corona';   
      nameInput.dispatchEvent(new Event('input'));  
      brandInput.value = 'Corona';
      brandInput.dispatchEvent(new Event('input'));
      nationalityInput.value = 'Mexico';
      nationalityInput.dispatchEvent(new Event('input'));
      alcoholPercentageInput.value = 4;
      alcoholPercentageInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;    
      expect(submitButton.disabled).toBeFalsy();
    });    
  });

  it('return list button should be clicked', async() => { 
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let returnButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;    
      let navigateSpy = spyOn(router, 'navigate');
      returnButton.click();
      expect(navigateSpy).toHaveBeenCalledWith(['/beers']);
    });    
  });
});
