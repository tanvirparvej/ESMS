import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BankAccountService } from '../../service/bank-account.service';
import { BankAccount } from '../../entities/bank-account.model';

@Component({
  selector: 'app-bank-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss']
})
export class BankAccountListComponent implements OnInit {
  accounts: BankAccount[] = [];
  loading = false;
  error = '';

  constructor(
    private bankAccountService: BankAccountService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.bankAccountService.getAll().subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bank accounts';
        this.loading = false;
      }
    });
  }

  editAccount(accountNo: string): void {
    this.router.navigate(['/bank-accounts/edit', accountNo]);
  }

  deleteAccount(accountNo: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.bankAccountService.delete(accountNo).subscribe(() => this.loadAccounts());
    }
  }
}
