import type { Employee } from './employee.model';

export interface SalaryPayment {
  id?: number;
  paymentDate: string;
  amount: number;
  employee: Employee;
}