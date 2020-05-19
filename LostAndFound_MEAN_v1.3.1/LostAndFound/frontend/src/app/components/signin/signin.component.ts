import { User } from './../../models/user';
import { ServerResponse } from './../../models/server-response';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  response = new ServerResponse;
  loginForm: FormGroup;

  constructor(public userService: UserService, private router: Router, private fb: FormBuilder) { }
  valid = true;


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  resetForm() {
    this.loginForm.reset();
  }

  login() {
    if (!this.loginForm.invalid) {
      this.userService.postLogin(this.loginForm.value)
        .subscribe(
          res => {
            this.response = res as ServerResponse;
            console.log(this.response.message)
            if (this.response.success) {
              this.resetForm();
              this.router.navigate(['/object-lost']);
            }
          },
          error => console.log(error)
        )
    }
  }

  emailVal(event) {
    let patt = /^([a-z]|[.-]|\d)$/;
    let result = patt.test(event.key);
    return result;
  }
}
