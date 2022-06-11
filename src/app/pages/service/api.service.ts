import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  CryptoTenInterface,
  CryptoTenPureInterface,
} from '../modes/cryptoTen.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTopTenCoins(currency: string) {
    return this.http
      .get<CryptoTenInterface[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h`
      )
      .pipe(
        map((data: CryptoTenInterface[]) => {
          let cryptoTen: CryptoTenPureInterface[] = [];
          data.map((coin) => {
            cryptoTen.push({
              id: coin.id,
              image: coin.image,
              current_price: coin.current_price,
              total_supply: coin.total_volume ? coin.total_volume : 0,
              total_volume: coin.total_volume,
            });
          });
          return cryptoTen;
        })
      );
  }

  getTopHundredCoins(currency: string) {
    return this.http
      .get<CryptoTenInterface[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .pipe(
        map((data: CryptoTenInterface[]) => {
          let cryptoTen: any[] = [];
          data.map((coin) => {
            cryptoTen.push({
              id: coin.id,
              name: coin.image,
              progress: coin.current_price,
              fruit: coin.total_volume ? coin.total_volume : 0,
            });
          });
          return cryptoTen;
        })
      );
  }

  getChart(coin: string, currency: string, days: number) {
    return this.http
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${currency}&days=${days}`
      )
      .pipe(
        map((data: any) => {
          let coin: any[] = [];
          data.map((el: any) => {
            coin.push({ time: el[0], price: el[4] });
          });
          return coin;
        })
      );
  }

  getCoin(coin: string) {
    return this.http
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
      )
      .pipe(
        map((coin: any) => ({
          id: coin.id,
          image: coin.image.large,
          description: coin.description.en,
          rank: coin.coingecko_rank,
          liquidity_score: coin.liquidity_score,
        }))
      );
  }
}
