import { Component } from '@angular/core';
import { CompanyAccountService } from '../../service/company-account.service';
import { SalaryService } from '../../service/salary-payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salary-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary-payment.component.html',
  styleUrls: ['./salary-payment.component.scss']
})
export class SalaryPaymentComponent {
  loading = false;
  successMsg = '';
  errorMsg = '';
  showFundModal = false;
  neededAmount = 0;
  fundAmount = 0;

  constructor(
    private salaryService: SalaryService,
    private companyAccountService: CompanyAccountService
  ) {}

  paySalaries(): void {
    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.salaryService.paySalaries().subscribe({
      next: (msg) => {
        this.successMsg = "Payment Successful." ;
        this.loading = false;
      },
      error: (err) => {
        const errorText: string = typeof err.error === 'string' ? err.error : (err.error?.message || JSON.stringify(err.error));
        if (errorText.includes('Insufficient company balance')) {
          const requiredMatch = errorText.match(/Required:\s*([\d.]+)/);
          const availableMatch = errorText.match(/Available:\s*([\d.]+)/);

          const required = requiredMatch ? parseFloat(requiredMatch[1]) : 0;
          const available = availableMatch ? parseFloat(availableMatch[1]) : 0;

          this.neededAmount = required - available;
          this.showFundModal = true;
        } else {
          this.errorMsg = 'Payment failed.';
        }
        this.loading = false;
      }
    });
  }

  confirmAddFunds(): void {
    const companyId = 1;
    this.companyAccountService.addFunds(companyId, this.fundAmount).subscribe({
      next: () => {
        this.showFundModal = false;
        this.fundAmount = 0;
        this.paySalaries();
      },
      error: (err) => {
        this.errorMsg = 'Failed to add funds. ' + err.message;
        this.showFundModal = false;
      }
    });
  }

  cancelFundModal(): void {
    this.showFundModal = false;
  }
}
