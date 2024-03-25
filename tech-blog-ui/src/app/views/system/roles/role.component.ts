import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiRoleApiClient,
  RoleDto,
  RoleDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit, OnDestroy {
  //System variables
  public blockedPanel: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  //Paging variables
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalCount: number;

  //Business variables
  public selectedItems: RoleDto[] = [];
  public items: RoleDto[];
  public keyword: string = '';
  constructor(private roleService: AdminApiRoleApiClient) {}

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

          this.toggleBlockUI(false);
        },
        error: (e) => {
          console.log(e);
          this.toggleBlockUI(false);
        },
      });
  }
  showAddModal() {}
  deleteItems() {}
  showEditModal() {}
  showPermissionModal(id: string, name: string) {}

  pageChanged(event: any): void {}

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
