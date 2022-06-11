import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
