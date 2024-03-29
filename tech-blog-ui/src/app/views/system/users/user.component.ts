import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiUserApiClient,
  UserDto,
  UserDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';
import { CommonConstants } from 'src/app/shared/constants/common.constants';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SetPasswordComponent } from './set-password.component';
import { MessageConstants } from 'src/app/shared/constants/messages.constants';
import { UserDetailComponent } from './user-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  // System variables
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;

  //Paging variables
  public totalCount: number;
  public pageSize: number = CommonConstants.pageSize;
  public pageIndex: number = CommonConstants.pageIndex;

  //Business variables
  public selectedItems: UserDto[] = [];
  public items: UserDto[];
  public keyword: string;

  constructor(
    private userManager: AdminApiUserApiClient,
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

  loadData(selectionId = null): void {
    this.toggleBlockUI(true);
    this.userManager
      .getAllUserPaging(this.keyword, this.pageIndex, this.pageSize)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: UserDtoPagedResult) => {
          this.items = response.result;
          this.totalCount = response.rowCount;
          if (selectionId != null && this.items.length > 0) {
            this.selectedItems = this.items.filter((x) => x.id === selectionId);
          }
        },
        error: () => {},
        complete: () => this.toggleBlockUI(false),
      });
  }
  pageChanged(event: any): void {}

  showAddModal(): void {
    const ref = this.dialogService.open(UserDetailComponent, {
      header: 'Thêm mới người dùng',
      width: '60%',
    });
  }
  showEditModal() {}

  deleteItems() {}

  assignRole(id: any): void {}
  changeEmail(id: any): void {}
  setPassword(id: string): void {
    const ref = this.dialogService.open(SetPasswordComponent, {
      data: {
        id: id,
      },
      header: 'Đặt lại mật khẩu',
      width: '60%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.alertService.showSuccess(
          MessageConstants.CHANGE_PASSWORD_SUCCCESS_MSG
        );
        this.selectedItems = [];
        this.loadData();
      }
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }
}
