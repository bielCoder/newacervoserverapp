import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDialogComponent } from './create-dialog.component';

describe('DialogComponent', () => {
  let component: CreateDialogComponent;
  let fixture: ComponentFixture<CreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
