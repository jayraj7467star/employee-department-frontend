import { Routes } from '@angular/router';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', component: DepartmentSearchComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
];
