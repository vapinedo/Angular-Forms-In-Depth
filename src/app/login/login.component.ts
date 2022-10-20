import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  val = {
    email: "valp@gmail.com",
    password: "adminpass"
  };

  constructor() {}

  ngOnInit() {}

  onLogin(form: NgForm, submit: any): void {
    console.log(form.value);
    console.log(form.valid);
    console.log("val", this.val);
  }
  
}
