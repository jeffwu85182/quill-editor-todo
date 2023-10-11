import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParchmentComponent } from './parchment.component';

describe('ParchmentComponent', () => {
  let component: ParchmentComponent;
  let fixture: ComponentFixture<ParchmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ParchmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParchmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
