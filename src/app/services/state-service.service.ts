import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  private stateSource = new BehaviorSubject<number>(0);
  state$ = this.stateSource.asObservable();

  constructor() { }

  changeState(state: number) {
    this.stateSource.next(state);
    // console.log(`State changed to: ${state}`);
  }
}
