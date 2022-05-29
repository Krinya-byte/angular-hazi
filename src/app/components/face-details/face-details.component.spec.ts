import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceDetailsComponent } from './face-details.component';

describe('FaceDetailsComponent', () => {
  let component: FaceDetailsComponent;
  let fixture: ComponentFixture<FaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
