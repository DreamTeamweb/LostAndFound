declare var jQuery:any;
import { ServerResponse } from './../../models/server-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ASTWithSource } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  @ViewChild('myModal') myModal:ElementRef;
  errors: string[];
  isChecked: boolean;
  dialCode = "+33";
  userForm: FormGroup;
  response = new ServerResponse;
  show: boolean;//see password

  constructor(public userService: UserService, private router: Router,private main: AppComponent, private fb: FormBuilder) {
    this.isChecked = false;
    // initialize variable value
    this.errors= [];
    this.show = false;
    this.createForm();
  }

  ngOnInit(): void {
    this.Connection();
  }


  Connection() {
    this.userService.getConnection()
      .subscribe(
        res => {
          console.log(res);
          this.main.logged = true;
          this.router.navigate(['/object-lost'])
        },
        error => {
          this.main.logged = false;
          //console.log(error); 
        })
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      number: [{ value: '', disabled: !this.isChecked },[ Validators.required,Validators.pattern('([0-9 ])+')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&/?]).{8,18})')]],
      confirmPassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /*validatePassword(group: FormGroup) {
    let pass = group.get('password').value;
    let pattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&\?]).{8,18}$/;
    if (pattern.test(pass)) {
      return true;
    }else {
      return false;
    }

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }*/

  resetForm(form?: FormGroup) {
    form.reset();
  }


  addUser() {
    console.log(this.userForm.invalid)
    console.log(this.f)
    
    if (!this.userForm.invalid) {
      this.f.number.setValue(this.dialCode + " " + this.f.number.value)
      
      this.userService.postUser(this.userForm.value)
        .subscribe(res => {
          this.response = res as ServerResponse;
          console.log(res);
          if(this.response.success){
            jQuery(this.myModal.nativeElement).modal('show'); 
          }else{
            this.errors.push(this.response.message);
            this.f.number.setValue(this.f.number.value.substr(this.f.number.value.indexOf(' ')+1));
          }
          
          //this.router.navigate(['/signin']);
        },
          error => {
            //console.log(error);
            //const {errors} = error;
            //console.log(error.data)
          }
        )
    }
  }

  checkValue(event: boolean) {
    const number = this.userForm.get('number');
    if (!event) {
      this.isChecked = true;
      number.enable();
      this.userService.selectedUser.number = "";
    } else {
      this.isChecked = false;
      number.disable();
    }
    //console.log(this.isChecked);
  }

  getNumber(event) {
    console.log(event);
  }

  onCountryChange(event) {
    //console.log(event.dialCode)
    this.dialCode = "+" + event.dialCode;
  }

  numericOnly(event) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    const long = this.f.number.value.length;
    if (long == 2 || long == 5 || long == 8 || long == 11) {
      this.f.number.setValue(this.f.number.value + " ");
    }
    if (long == 14) {
      return false;
    }
    return result;
  }

  emailVal(event) {
    let patt = /^([a-z]|[.-]|\d)$/;
    let result = patt.test(event.key);
    return result;
  }

  passwordVal(event) {
    let patt:RegExp= /^([0-9]|[a-z]|[A-Z]|[-!@#$%^&/?])$/;
    let result = patt.test(event.key);
    return result;
  }

  // variable



  // click event function toggle
  showPassword() {
    this.show = !this.show;
  }

  redirect(){
    this.resetForm(this.userForm);
    this.router.navigate(['/signin']);
  }
}

