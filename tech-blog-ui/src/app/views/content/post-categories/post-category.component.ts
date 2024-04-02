import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiPostCategoryApiClient,
  PostCategoryDto,
  PostCategoryDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';
import { CommonConstants } from 'src/app/shared/constants/common.constants';
import { MessageConstants } from 'src/app/shared/constants/messages.constants';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PostCategoryDetailComponent } from './post-category-detail.component';

@Component({
  templateUrl: 'post-category.component.html',
})
export class PostCategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;

  //Paging variables
  public totalCount: number;
  public pageSize: number = CommonConstants.pageSize;
  public pageIndex: number = CommonConstants.pageIndex;

  //Business variables
  public selectedItems: PostCategoryDto[] = [];
  public items: PostCategoryDto[];
  public keyword: string;

  constructor(
    private dialogService: DialogService,
    private postCategoryService: AdminApiPostCategoryApiClient,
    private alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.toggleBlockUI(true);

    this.postCategoryService
      .getPostCategoriesPaging(this.keyword, this.pageIndex, this.pageSize)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: PostCategoryDtoPagedResult) => {
          this.items = response.result;
          this.totalCount = response.rowCount;
        },
        complete: () => this.toggleBlockUI(false),
      });
  }

  showAddModal(): void {
    const ref = this.dialogService.open(PostCategoryDetailComponent, {
      header: 'Thêm mới loạt bài viết',
      width: '60%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: PostCategoryDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.CREATED_OK_MSG);
        this.selectedItems = [];
        this.loadData();
      }
    });
  }

  showEditModal(): void {}

  deleteItems(): void {}

  pageChanged(event): void {}

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
