import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../service/salary-payment.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-salary-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './salary-payment.component.html',
  styleUrls: ['./salary-payment.component.scss']
})
export class SalaryPaymentComponent implements OnInit {
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {}

  paySalaries(): void {
    if (!confirm('Are you sure you want to pay salaries now?')) {
      return;
    }

    this.loading = true;
    this.salaryService.paySalaries().subscribe({
      next: (response) => {
        this.successMessage = 'Payment Successful!';
        this.errorMessage = '';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Payment failed';
        this.successMessage = '';
        this.loading = false;
      }
    });
  }
}
