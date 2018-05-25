import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { Constants } from '../../helpers/constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './util.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constants: Constants = new Constants();
  frmBuilder: FormBuilder;
  serverValue = 0;

  constructor(private frmbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) {
    var email = window.localStorage.getItem("email");
    var password = window.localStorage.getItem("password");

    if (email !== null && password !== null) {
      this.router.navigate(['pages/tables/products']);
    }
  }

  ngOnInit() {
    this.loginForm = this.frmbuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    if (this.serverValue == 0) {
      window.localStorage.setItem("url", "https://api.aktivido.com");
    } else {
      window.localStorage.setItem("url", "https://dev.aktivido.com");
    }
    var usr = this.loginForm.controls.username.value;
    var psw = this.loginForm.controls.password.value;
    let body = {
      email: usr,
      password: psw
    };
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    this.http.post(this.constants.getEnvUrl() + '/login?email=' + body.email + '&password=' + body.email, { headers: header }).subscribe(response => {
      let r = response as Array<Object>
      if (r["errorCode"] === 401) {
        window.alert("Email veya şifre yanlış.");
      } else {
        if (r["role"] !== 3) {
          window.alert("Buraya girmek için yetkiye sahip değilsiniz.");
        } else {
          window.localStorage.setItem("email", body.email);
          window.localStorage.setItem("password", body.password);
          this.router.navigate(['pages/product/view']);
        }
      }
    },
      error => {
        console.log(error);
        window.alert("Email veya şifre yanlış.");
      });
  }
}
