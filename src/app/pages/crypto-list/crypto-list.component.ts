import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CryptoTenPureInterface } from '../modes/cryptoTen.interface';
import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements AfterViewInit, OnDestroy {
  coins: CryptoTenPureInterface[] = [];
  currency: boolean;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'progress', 'name', 'fruit'];
  onDestroy$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.initValues();
  }

  initValues() {
    this.currencyService.selectedCurrency
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: string) => {
        this.currency = !this.currency;

        // fill table
        this.apiService
          .getTopHundredCoins(data)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((coins) => {
            this.dataSource = new MatTableDataSource(coins);
            setTimeout(() => (this.dataSource.paginator = this.paginator), 10);
            setTimeout(() => (this.dataSource.sort = this.sort), 10);
          });

        //Top ten API
        this.apiService
          .getTopTenCoins(data)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((coins) => (this.coins = coins));
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCoinDetail(id: string) {
    this.router.navigate(['/coin-detail', id]);
  }

  ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }
}
