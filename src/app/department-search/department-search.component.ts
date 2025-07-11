// src/app/department-search/department-search.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ import this

@Component({
  selector: 'app-department-search',
  standalone: true,
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.css'],
  imports: [CommonModule, FormsModule, RouterModule] // ✅ add RouterModule
})
export class DepartmentSearchComponent {
  departmentId = '';
  employees: Employee[] = [];
  error = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  searchEmployees(): void {
    const id = this.departmentId.trim();
    if (!id) return;

    this.employeeService.getEmployeesByDepartment(id).subscribe({
      next: (data) => {
        this.employees = data;
        this.error = '';
      },
      error: () => {
        this.employees = [];
        this.error = 'No employees found or error occurred.';
      }
    });
  }

  goToEmployee(employee: Employee): void {
    this.router.navigate(['/employee', employee.id]);
  }
}
