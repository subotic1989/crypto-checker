import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  changingValue(value: string) {
    this.currencyService.selectedCurrency.next(value);
  }
}
