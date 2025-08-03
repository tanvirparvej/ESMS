import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAccount } from '../../entities/company-account.model';
import { CompanyAccountService } from '../../service/company-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-account-list.component.html',
  styleUrls: ['./company-account-list.component.scss']
})
export class CompanyAccountListComponent implements OnInit {
  accounts: CompanyAccount[] = [];
  loading = false;
  error = '';

  constructor(
    private companyAccountService: CompanyAccountService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
  this.loading = true;
  this.companyAccountService.getAll().subscribe({
    next: (data) => {
      this.accounts = data;
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load company accounts';
      this.loading = false;
    }
  });
}

  editAccount(id: number): void {
    this.router.navigate(['/company-accounts/edit', id]);
  }

  deleteAccount(id: number): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.companyAccountService.delete(id).subscribe(() => this.loadAccounts());
    }
  }
}
