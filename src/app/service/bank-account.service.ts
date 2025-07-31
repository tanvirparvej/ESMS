import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from '../entities/bank-account.model';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private apiUrl = `${environment.apiBaseUrl}/bank-accounts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.apiUrl);
  }

  getByAccountNo(accountNo: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/${accountNo}`);
  }

  create(bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.apiUrl, bankAccount);
  }

  update(bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.put<BankAccount>(this.apiUrl, bankAccount);
  }

  delete(accountNo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${accountNo}`);
  }
}
