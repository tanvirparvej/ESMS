import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankAccountService } from '../../service/bank-account.service';
import { BankAccount } from '../../entities/bank-account.model';

@Component({
  selector: 'app-bank-account-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bank-account-create.component.html',
  styleUrls: ['./bank-account-create.component.scss']
})
export class BankAccountCreateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  accountNoParam = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      accountNo: ['', [Validators.required, Validators.minLength(5)]],
      accountName: ['', Validators.required],
      accountType: ['', Validators.required],
      currentBalance: [0, [Validators.required, Validators.min(0)]],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required]
    });

    const param = this.route.snapshot.paramMap.get('accountNo');
    if (param) {
      this.isEditMode = true;
      this.accountNoParam = param;
      this.loadAccount(param);
    }
  }

  loadAccount(accountNo: string): void {
    this.loading = true;
    this.bankAccountService.getByAccountNo(accountNo).subscribe({
      next: (acc) => {
        this.form.patchValue(acc);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load account';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const accountData: BankAccount = this.form.value;

    const request = this.isEditMode
      ? this.bankAccountService.update(accountData)
      : this.bankAccountService.create(accountData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/bank-accounts']);
      },
      error: () => {
        this.error = 'Failed to save account';
        this.loading = false;
      }
    });
  }
}
