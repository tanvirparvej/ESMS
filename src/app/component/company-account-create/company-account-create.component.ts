import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CompanyAccountService } from '../../service/company-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyAccount } from '../../entities/company-account.model';

@Component({
  selector: 'app-company-account-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company-account-create.component.html',
  styleUrls: ['./company-account-create.component.scss']
})
export class CompanyAccountCreateComponent implements OnInit {
  accountForm!: FormGroup;

  loading = false;
  error = '';
  isEditMode = false;
  accountId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private companyAccountService: CompanyAccountService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountNo: ['', [Validators.required, Validators.minLength(5)]],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      currentBalance: [0, [Validators.required, Validators.min(0)]],
      grade6BasicSalary: [0, [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Route param id:', idParam);
    if (idParam) {
      this.isEditMode = true;
      this.accountId = +idParam;
      this.loadAccount(this.accountId);
    }
  }

  loadAccount(id: number): void {
    this.loading = true;
    this.companyAccountService.getById(id).subscribe({
      next: (data: CompanyAccount) => {
        this.accountForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load account details.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const formValue = this.accountForm.value as CompanyAccount;

    if (this.isEditMode && this.accountId) {
      formValue.id = this.accountId;
      this.companyAccountService.update(formValue).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/company-accounts']);
        },
        error: (err) => {
          this.error = 'Failed to update account.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.companyAccountService.create(formValue).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/company-accounts']);
        },
        error: (err) => {
          this.error = 'Failed to create account.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
}
