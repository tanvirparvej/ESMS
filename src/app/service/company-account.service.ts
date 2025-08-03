import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompanyAccount } from '../entities/company-account.model';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyAccountService {
  private apiUrl = `${environment.apiBaseUrl}/company-accounts`;

  constructor(private http: HttpClient) {}

 
  getAll(): Observable<CompanyAccount[]> {
    return this.http.get<CompanyAccount[]>(this.apiUrl);
  }

  getById(id: number): Observable<CompanyAccount> {
    return this.http.get<CompanyAccount>(`${this.apiUrl}/${id}`);
  }

  create(account: CompanyAccount): Observable<CompanyAccount> {
    return this.http.post<CompanyAccount>(this.apiUrl, account);
  }

  update(account: CompanyAccount): Observable<CompanyAccount> {
    return this.http.put<CompanyAccount>(this.apiUrl, account);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addFunds(id: number, amount: number): Observable<CompanyAccount> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post<CompanyAccount>(`${this.apiUrl}/${id}/add-funds`, null, { params });
  }

  deductFunds(id: number, amount: number): Observable<CompanyAccount> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post<CompanyAccount>(`${this.apiUrl}/${id}/deduct-funds`, null, { params });
  }
}
