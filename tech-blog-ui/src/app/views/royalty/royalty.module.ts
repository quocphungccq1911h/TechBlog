import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { PanelModule } from 'primeng/panel';
import { TransactionComponent } from './transactions/transactions.component';
import { RoyaltyUserComponent } from './royalty-user/royalty-user.component';
import { RoyaltyMonthComponent } from './royalty-month/royalty-month.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PaginatorModule,
    BadgeModule,
    InputNumberModule,
    PanelModule,
    InputTextModule,
    TableModule,
  ],
  declarations: [
    TransactionComponent,
    RoyaltyMonthComponent,
    RoyaltyUserComponent,
  ],
})
export class RoyaltyModule {}
