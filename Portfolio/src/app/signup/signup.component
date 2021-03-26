import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  msg:string="";
  user1:string="";
  pass1:string="";
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
    checkUser(userRef:any){
      console.log(userRef);
      sessionStorage.setItem("userRef",JSON.stringify(userRef)); 
      this.router.navigate([`/login`]);
     
     
    
  }
}
