import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  errors: string[];
  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    form.reset();
  }


  addUser(form: NgForm) {
    //console.log(form.value);
    this.userService.postUser(form.value)
      .subscribe(res => {
        
        console.log(res);
        this.resetForm(form);
        this.router.navigate(['/signin']);},
        error=>{
          console.log(error);
          //const {errors} = error;
        console.log(error.data)}
        )
  }
}
