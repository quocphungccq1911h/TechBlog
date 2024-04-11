import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: 'transactions.component.html',
})
export class TransactionComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
