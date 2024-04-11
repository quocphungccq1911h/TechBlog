import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonConstants } from 'src/app/shared/constants/common.constants';
import { PageEvent } from 'src/app/shared/models/page-event.model';
import {} from 'src/app/api/admin-api.service.generated';

@Component({
  templateUrl: 'transactions.component.html',
})
export class TransactionComponent implements OnInit, OnDestroy {
  // Default
  public blockedPanel: boolean = false;

  // paging
  public totalCount: number;
  public pageSize: number = CommonConstants.pageSize;

  constructor() {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  pageChanged(event: PageEvent) {}
}
