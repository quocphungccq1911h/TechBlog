import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DynamicDialogComponent,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiPostCategoryApiClient,
  PostCategoryDto,
} from 'src/app/api/admin-api.service.generated';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  templateUrl: 'post-category-detail.component.html',
})
export class PostCategoryDetailComponent implements OnInit, OnDestroy {
  private ngUnsubcribe = new Subject<void>();

  public form: FormGroup;
  public btnDisabled: boolean = false;
  public saveBtnName: string;
  public closeBtnName: string;
  public blockedPanelDetail: boolean = false;
  selectedEntity = {} as PostCategoryDto;

  constructor(
    private fb: FormBuilder,
    private postCategoryService: AdminApiPostCategoryApiClient,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogComponent,
    private utilService: UtilityService
  ) {}

  ngOnInit(): void {
    this.buidForm();
    if (!this.utilService.isEmpty(this.config.data?.id)) {
      this.loadDetail(this.config.data.id);
      this.saveBtnName = 'Cập nhật';
      this.closeBtnName = 'Hủy';
    } else {
      this.saveBtnName = 'Thêm';
      this.closeBtnName = 'Đóng';
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implements');
  }

  saveChange(): void {}

  generateSlug(): void {}

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    slug: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };

  loadDetail(id: string): void {
    this.toggleBlockUI(true);
    this.postCategoryService
      .getPostCategoryById(id)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe({
        next: (response: PostCategoryDto) => {
          this.selectedEntity = response;
          this.buidForm();
        },
        complete: () => this.toggleBlockUI(false),
      });
  }

  buidForm(): void {
    this.form = this.fb.group({
      name: new FormControl(
        this.selectedEntity || null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ])
      ),
      slug: new FormControl(
        this.selectedEntity.slug || null,
        Validators.required
      ),
      sortOrder: new FormControl(
        this.selectedEntity.sortOrder || null,
        Validators.required
      ),
      isActive: new FormControl(this.selectedEntity.isActive || false),
      seoDescription: new FormControl(
        this.selectedEntity.seoDescription || null
      ),
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
    }
  }
}
