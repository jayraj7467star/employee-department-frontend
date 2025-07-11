// src/app/employee-detail/employee-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  editMode = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (emp) => (this.employee = emp),
        error: () => (this.message = 'Employee not found'),
      });
    }
  }

  enableEdit(): void {
    this.editMode = true;
    this.message = '';
  }

  saveChanges(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: (emp) => {
          this.employee = emp;
          this.message = 'Employee updated successfully';
          this.editMode = false;
        },
        error: () => (this.message = 'Failed to update'),
      });
    }
  }

  deleteEmployee(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.message = 'Deleted successfully';
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: () => (this.message = 'Failed to delete'),
      });
    }
  }
}
