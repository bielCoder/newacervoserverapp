import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricToUserComponent } from './historic-to-user.component';

describe('HistoricToUserComponent', () => {
  let component: HistoricToUserComponent;
  let fixture: ComponentFixture<HistoricToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricToUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
