import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarPracticeComponent } from './toolbar-practice.component';

describe('ToolbarPracticeComponent', () => {
  let component: ToolbarPracticeComponent;
  let fixture: ComponentFixture<ToolbarPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToolbarPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
