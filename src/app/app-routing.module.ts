import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/crypto-list/crypto-list.module').then(
        (m) => m.CryptoListModule
      ),
  },
  {
    path: 'coin-detail/:coin',
    loadChildren: () =>
      import('./pages/coin-detail/coin-detail.module').then(
        (m) => m.CoinDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
