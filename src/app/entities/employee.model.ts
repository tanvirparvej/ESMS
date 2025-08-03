import { BankAccount } from './bank-account.model';

export interface Employee {
  id: number;
  name: string;
  grade: number;
  address?: string;
  mobile?: string;
  salary?: number;
  bankAccount?: BankAccount | null;
}
