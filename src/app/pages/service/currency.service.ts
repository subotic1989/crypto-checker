import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  selectedCurrency = new BehaviorSubject<string>('eur');
}
