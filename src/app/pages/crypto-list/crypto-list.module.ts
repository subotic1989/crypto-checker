import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CryptoListRoutingModule } from './crypto-list-routing.module';
import { CryptoListComponent } from './crypto-list.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CryptoListComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    CryptoListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
})
export class CryptoListModule {}
