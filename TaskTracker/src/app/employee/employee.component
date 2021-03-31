import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Array<Employee>=[];
  constructor(public empSer:EmployeeService) { }

  ngOnInit(): void {
    this.empSer.loadEmployeeDetails().subscribe(result=>this.employees=result,
      error=>console.log(error))
  }
  storeUser(empRef:any){
    console.log(empRef)
    this.empSer.storeEmployee(empRef)
    
  }

}
