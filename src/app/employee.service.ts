// src/app/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  salary: number;
  departmentId: string;
  departmentName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  // ✅ Get all employees in a department
  getEmployeesByDepartment(deptId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/department/${deptId}`);
  }

  // ✅ Get a single employee by ID
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  // ✅ Add or update employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  // ✅ Delete employee
  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
