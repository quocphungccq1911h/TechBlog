import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { values } from 'lodash-es';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import {
  AdminApiPostApiClient,
  AdminApiSeriesApiClient,
  SeriesInListDto,
} from 'src/app/api/admin-api.service.generated';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  templateUrl: 'post-series.component.html',
})
export class PostSeriesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  // Default
  public blockedPanelDetail: boolean = false;
  public postSeries: any[];
  public btnDisabled: boolean = false;
  public form: FormGroup;
  public allSeries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private seriesApiClient: AdminApiSeriesApiClient,
    private postApiClient: AdminApiPostApiClient,
    private utilService: UtilityService,
    private config: DynamicDialogConfig
  ) {}

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    seriesId: [{ type: 'required', message: 'Bạn phải chọn loạt bài' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    //Init form
    this.buildForm();
    //Load data to form
    const series = this.seriesApiClient.getAllSeries();
    this.toggleBlockUI(true);
    forkJoin({
      series,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: any) => {
          //Push categories to dropdown list
          const series = repsonse.series as SeriesInListDto[];
          series.forEach((element) => {
            this.allSeries.push({
              values: element.id,
              label: element.name,
            });
          });
          if (!this.utilService.isEmpty(this.config.data?.id)) {
            this.loadSeries(this.config.data.id);
          } else {
            this.toggleBlockUI(false);
          }
        },
        error: () => this.toggleBlockUI(false),
      });
  }

  loadSeries(id: string): void {
    this.postApiClient
      .getSeriesBelong(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: SeriesInListDto[]) => {
          this.postSeries = response;
        },
        complete: () => this.toggleBlockUI(false),
      });
  }

  removeSeries(id: string): void {}

  saveChange(): void {}

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

  buildForm(): void {
    this.form = this.fb.group({
      seriesId: new FormControl(null, Validators.required),
      sortOrder: new FormControl(0, Validators.required),
    });
  }
}
