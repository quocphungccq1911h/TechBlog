import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SystemRoutingModule } from './system-routing.module';
import { UserComponent } from './users/user.component';
import { RoleComponent } from './roles/role.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import { TechBlogModule } from 'src/app/shared/modules/techblog-shared.module';
import { RolesDetailComponent } from './roles/roles-detail.component';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  imports: [
    SystemRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PaginatorModule,
    PanelModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TechBlogModule,
    KeyFilterModule,
  ],
  declarations: [UserComponent, RoleComponent, RolesDetailComponent],
})
export class SystemModule {}
