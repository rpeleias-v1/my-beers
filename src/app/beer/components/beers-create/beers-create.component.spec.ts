import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BeersCreateComponent } from './beers-create.component';
import { BeerService} from '../../services/beer.service';

describe('BeersCreateComponent', () => {
  let component: BeersCreateComponent;
  let fixture: ComponentFixture<BeersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule, 
        FormsModule, 
        RouterTestingModule],
      providers: [BeerService],
      declarations: [ BeersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
