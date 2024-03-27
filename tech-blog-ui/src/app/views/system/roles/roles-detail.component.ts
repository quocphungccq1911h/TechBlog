import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'roles-detail.component.html',
})
export class RolesDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscrise = new Subject<void>();

  // Default
  public form: FormGroup;
  public blockedPanelDetail: boolean = false;
  public saveBtnName: string;
  public btnDisabled: boolean = false;
  selectedEntity = {} as 

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên quyền' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    displayName: [{ type: 'required', message: 'Bạn phải tên hiển thị' }],
  };

  saveChange() {}

  buildForm() {
    this.form = this.fb.group({
        name: new FormControl(
            this.se
        )
    })
  }

  private toogleBlockUI(enabled: boolean) {
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
