import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm;

  localLogin(data: { email: string, password: string, remember: boolean }) {
    if(data.remember)
      localStorage.setItem('local-login', data.email);
    
    this.auth.doLocalLogin(data.email, data.password)
      .then(this.handleAuthComplete);
  }

  googleLogin() {
    this.auth.doGoogleLogin()
      .then(this.handleAuthComplete);
  }

  facebookLogin() {
    this.auth.doGoogleLogin()
      .then(this.handleAuthComplete);
  }

  twitterLogin() {
    this.auth.doGoogleLogin()
      .then(this.handleAuthComplete);
  }

  private handleAuthComplete(user: auth.UserCredential) {
    // store user data
    // route to home (or returnUrl?)
  }
  
  ngOnInit(): void {
    const email = localStorage.getItem('local-login') || '';
    this.loginForm = this.fb.group({
      email: [email],
      password: [''],
      remember: [false]
    });
  }

  constructor(private fb: FormBuilder, public auth: AuthService) { }
}
