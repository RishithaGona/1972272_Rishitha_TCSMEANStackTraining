import { Component, OnInit } from '@angular/core';
import { SignupComponent} from 'src/app/signup/signup.component'
import { Router } from '@angular/router';





@Component({
  selector: 'loginapp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  constructor(public router:Router) { }
  msg:string = ""
  ngOnInit(): void {
  }
  verifyUser(userRef:any){
    var user_json:any = JSON.parse(sessionStorage.getItem("userRef")!);
    console.log(userRef);
    
  
    if(user_json.user  == userRef.user && user_json.pass == userRef.pass){
      sessionStorage.setItem("token","123")
      this.router.navigate([`/home`]);
      
    } else{
      this.msg = "Fail try again"
    }

  }

}
