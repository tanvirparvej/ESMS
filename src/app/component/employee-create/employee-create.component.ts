import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../entities/employee.model';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  employeeId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      grade: [0, [Validators.required, Validators.min(1)]],
      address: [''],
      mobile: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = +idParam;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          grade: employee.grade,
          address: employee.address,
          mobile: employee.mobile,
          salary: employee.salary
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employee.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const employeeData: Employee = {
      ...this.employeeForm.value,
      id: this.employeeId
    };

    const request = this.isEditMode
      ? this.employeeService.update(employeeData)
      : this.employeeService.create(employeeData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.error = 'Failed to save employee.';
        this.loading = false;
      }
    });
  }
}
