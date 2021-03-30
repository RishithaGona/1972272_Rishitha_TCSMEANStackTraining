import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }
  storeEmployee(login:any){
    this.http.post("http://localhost:3000/emp",login).
    subscribe(result=>console.log(result),error =>console.log(error));
    
      }
      loadEmployeeDetails():Observable<Employee[]> {
        return this.http.get<Employee[]>("http://localhost:3000/emp");
      }
}
