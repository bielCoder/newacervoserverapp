import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDialogComponent } from './reset-dialog.component';

describe('ResetDialogComponent', () => {
  let component: ResetDialogComponent;
  let fixture: ComponentFixture<ResetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
