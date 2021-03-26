import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(public router:Router) { }
 
  User_Names: Array<any> =[];
  user_json:any = JSON.parse(sessionStorage.getItem("userRef")!);
  user = this.user_json.user
  ngOnInit(): void {
  }
  logout(){
    sessionStorage.removeItem("token")
    this.router.navigate(["login"]);
  }
  addTotable(user:any){
    
    console.log(user.fname)
    
    this.User_Names.push(user)
    

  }
  
}
