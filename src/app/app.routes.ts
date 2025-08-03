import { Routes } from '@angular/router';
import { MasterComponent } from './layout/master/master.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { CompanyAccountListComponent } from './component/company-account-list/company-account-list.component';
import { CompanyAccountCreateComponent } from './component/company-account-create/company-account-create.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './component/employee-create/employee-create.component';
import { BankAccountListComponent } from './component/bank-account-list/bank-account-list.component';
import { BankAccountCreateComponent } from './component/bank-account-create/bank-account-create.component';
import { SalaryPaymentComponent } from './component/salary-payment/salary-payment.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'company-accounts', component: CompanyAccountListComponent },
      { path: 'company-accounts/create', component: CompanyAccountCreateComponent },
      { path: 'company-accounts/edit/:id', component: CompanyAccountCreateComponent },
      { path: 'employee', component: EmployeeListComponent },
      { path: 'employee/create', component: EmployeeCreateComponent },
      { path: 'employee/edit/:id', component: EmployeeCreateComponent },
      { path: 'bank-accounts', component: BankAccountListComponent },
      { path: 'bank-accounts/create', component: BankAccountCreateComponent },
      { path: 'bank-accounts/edit/:accountNo', component: BankAccountCreateComponent },
      { path: 'salary-payment', component: SalaryPaymentComponent }
    ]
  }
];
