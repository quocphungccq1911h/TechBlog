import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiSeriesApiClient,
  SeriesInListDto,
  SeriesInListDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';
import { CommonConstants } from 'src/app/shared/constants/common.constants';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  templateUrl: 'series.component.html',
})
export class SeriesComponent implements OnInit, OnDestroy {
  private ngUnsubcribe = new Subject<void>();
  public blockedPanel: boolean = false;
  //Default

  //Paging variables
  public totalCount: number;
  public pageSize: number = CommonConstants.pageSize;
  public pageIndex: number = CommonConstants.pageIndex;
  public keyword: string = '';
  //Business variables
  public selectedItems: SeriesInListDto[] = [];
  public items: SeriesInListDto[];

  constructor(
    private seriesApiClient: AdminApiSeriesApiClient,
    private dialogService: DialogService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.toggleBlockUI(true);
    this.seriesApiClient
      .getSeriesPaging(this.keyword, this.pageIndex, this.pageSize)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe({
        next: (response: SeriesInListDtoPagedResult) => {
          this.items = response.result;
          this.totalCount = response.rowCount;
        },
        complete: () => this.toggleBlockUI(false),
      });
  }

  showPosts(): void {}

  showAddModal(): void {}

  showEditModal(): void {}

  deleteItems(): void {}

  pageChanged(event: any) {}

  private toggleBlockUI(enabled: boolean) {
    if (enabled) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }
}
