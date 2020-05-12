import { User } from './../../models/user';
import { ServerResponse } from './../../models/server-response';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  response = new ServerResponse;
  constructor(public userService: UserService, private router: Router) { }
  valid = true;
  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    form.reset();
  }

  loginValidation(form:NgForm) {
    if (!this.userService.email) {
      this.response.message ="Saisissez un mail de l'INSA"
      this.valid = false;
    } else if (!this.userService.password) {
      this.response.message ="Saisissez le mot de passe"
      this.valid = false;
    }else{
      this.userService.postLogin(form.value)
        .subscribe(
          res => {
            this.response = res as ServerResponse;
            console.log(this.response.message)
            if (this.response.success) {
              this.resetForm(form);
              this.router.navigate(['/object-lost']);
            }
          },
          error => console.log(error)
        )
      }
  }
}
