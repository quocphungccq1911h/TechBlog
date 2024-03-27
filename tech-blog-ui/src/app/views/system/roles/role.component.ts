import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiRoleApiClient,
  RoleDto,
  RoleDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';
import { CommonConstants } from 'src/app/shared/constants/common.constants';
import { DialogService } from 'primeng/dynamicdialog';
import { RolesDetailComponent } from './roles-detail.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit, OnDestroy {
  //System variables
  public blockedPanel: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  //Paging variables
  public pageIndex: number = CommonConstants.pageIndex;
  public pageSize: number = CommonConstants.pageSize;
  public totalCount: number;

  //Business variables
  public selectedItems: RoleDto[] = [];
  public items: RoleDto[];
  public keyword: string = '';
  constructor(
    private roleService: AdminApiRoleApiClient,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData() {
    this.toggleBlockUI(true);

    this.roleService
      .getRolesAllPaging(this.keyword, this.pageIndex, this.pageSize)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RoleDtoPagedResult) => {
          this.items = response.result;
          this.totalCount = response.rowCount;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => this.toggleBlockUI(false),
      });
  }

  showAddModal() {
    const ref = this.dialogService.open(RolesDetailComponent, {
      header: 'Thêm mới quyền',
      width: '70%',
    });
    console.log(ref);
  }

  deleteItems() {}
  showEditModal() {}
  showPermissionModal(id: string, name: string) {}

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.pageSize = event.rows;
    this.loadData();
  }

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
