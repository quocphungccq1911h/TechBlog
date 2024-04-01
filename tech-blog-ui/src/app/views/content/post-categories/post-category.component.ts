import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostCategoryDto } from 'src/app/api/admin-api.service.generated';
import { CommonConstants } from 'src/app/shared/constants/common.constants';

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

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  loadData(): void {}

  showAddModal(): void {}

  showEditModal(): void {}

  deleteItems(): void {}

  pageChanged(event): void {}
}
