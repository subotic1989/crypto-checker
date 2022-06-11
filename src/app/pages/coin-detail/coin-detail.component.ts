import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil, map } from 'rxjs';
import { CoinInterface } from '../modes/coin.interface';
import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  coin: CoinInterface;
  daysDefault: number = 1;
  coinDefault: string = 'bitcoin';
  currencyDefault: string = 'eur';
  paramsCoin: string;
  myChart: any;
  onDestroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initCoinDetail();
    this.updateChartOnCurrencyChange();
  }

  updateChartOnCurrencyChange(): void {
    this.currencyService.selectedCurrency
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((currency: string) => {
        this.currencyDefault = currency;
        this.myChart?.destroy();
        this.initChart(this.paramsCoin, currency, this.daysDefault);
      });
  }

  onUpdateChartOnDateChange(days: number): void {
    this.daysDefault = days;
    this.myChart?.destroy();
    this.initChart(this.paramsCoin, this.currencyDefault, this.daysDefault);
  }

  initCoinDetail(): void {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => {
          this.paramsCoin = params['coin'];

          this.initChart(
            this.paramsCoin,
            this.currencyDefault,
            this.daysDefault
          );

          this.apiService
            .getCoin(this.paramsCoin)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((coin: CoinInterface) => {
              this.coin = coin;
            });
        })
      )
      .subscribe();
  }

  initChart(coin: string, currency: string, days: number) {
    this.apiService
      .getChart(coin, currency, days)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((coins) => {
        let time: any[] = [];
        let price: number[] = [];

        coins.map((coin: { time: number; price: number }) => {
          let date = new Date(coin.time);
          time.push(
            this.daysDefault !== 1
              ? `${date.getDate() + 1}.${date.getMonth() + 1}.${date
                  .getFullYear()
                  .toString()
                  .substr(-2)}`
              : `${date.getHours()}:${date.getMinutes()}h`
          );
          price.push(coin.price);
        });

        this.myChart?.destroy();
        this.renderChart(time, price);
      });
  }

  renderChart(labels: any[], data: number[]) {
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Coin Chart',
            data: data,
            fill: true,
            tension: 0.1,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            ticks: { color: '#fff' },
          },
          x: {
            ticks: { color: '#fff' },
            beginAtZero: false,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }
}
