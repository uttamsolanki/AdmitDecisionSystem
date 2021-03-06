import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StudentsComponent } from '../../pages/students/students.component';
import { AddUpdateStudentComponent } from '../../pages/students/add-update/add-update.component';
import { ViewStudentComponent } from '../../pages/students/view/view.component';
import { AdmitComponent } from '../../pages/admit/admit.component';
import {filterPipe} from 'src/app/pages/students/filter.pipe';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    StudentsComponent,
    AddUpdateStudentComponent,
    ViewStudentComponent,
    AdmitComponent,
    filterPipe
  ]
})

export class AdminLayoutModule {}
