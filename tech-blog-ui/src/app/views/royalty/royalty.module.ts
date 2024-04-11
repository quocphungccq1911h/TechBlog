import { NgModule } from '@angular/core';
import { TransactionComponent } from './transactions/transactions.component';
import { RoyaltyUserComponent } from './royalty-user/royalty-user.component';
import { RoyaltyMonthComponent } from './royalty-month/royalty-month.component';

@NgModule({
  imports: [],
  declarations: [
    TransactionComponent,
    RoyaltyMonthComponent,
    RoyaltyUserComponent,
  ],
})
export class RoyaltyModule {}
