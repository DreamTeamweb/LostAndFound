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

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loginValidation(form: NgForm) {
    console.log(form.value);
    this.userService.postLogin(form.value)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/object-lost']);
        },
        error => console.log(error)
      )
  }
}
