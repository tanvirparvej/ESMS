import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private apiUrl = `${environment.apiBaseUrl}/salary`;

  constructor(private http: HttpClient) {}

  paySalaries(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/pay`, null);
  }
}
