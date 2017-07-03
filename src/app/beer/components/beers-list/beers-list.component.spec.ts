import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { BeersListComponent } from './beers-list.component';
import { BeerService} from '../../services/beer.service';

describe('BeersListComponent', () => {
  let component: BeersListComponent;
  let fixture: ComponentFixture<BeersListComponent>;

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
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
