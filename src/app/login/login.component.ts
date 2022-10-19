import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onLogin(form: NgForm, submit: any): void {
    console.log(form.value);
    console.log(form.valid);
  }

  onEmailChange(event: any): void {
    console.log(event);
  }
}
