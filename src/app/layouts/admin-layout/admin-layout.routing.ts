import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { StudentsComponent } from '../../pages/students/students.component';
import { AddUpdateStudentComponent } from '../../pages/students/add-update/add-update.component';
import { ViewStudentComponent } from '../../pages/students/view/view.component';
import { AdmitComponent } from '../../pages/admit/admit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'students',       component: StudentsComponent },
    { path: 'students/addupdate',	component: AddUpdateStudentComponent },
    { path: 'students/addupdate/:id',	component: AddUpdateStudentComponent },
    { path: 'students/view/:id',	component: ViewStudentComponent },
    { path: 'admit',	component: AdmitComponent },
];
