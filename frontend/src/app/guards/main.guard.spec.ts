import { TestBed } from '@angular/core/testing';
import { MainGuard } from './main.guard';



describe('MainGuardGuard', () => {
  let guard: MainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
