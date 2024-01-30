import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  hide()
  {
    this.loadingSubject.next(false);
  }

  show()
  {
    this.loadingSubject.next(true);
  }
}
