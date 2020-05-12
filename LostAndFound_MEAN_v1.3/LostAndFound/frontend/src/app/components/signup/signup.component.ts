import { NgForm,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  errors: string[];
  isChecked: boolean;
  dialCode ="+33"
  userForm: FormGroup;
  constructor(public userService: UserService, private router: Router,private fb: FormBuilder) {
    this.isChecked = false;
    this.createForm();
  }

  ngOnInit(): void {

  }


  createForm() {
    this.userForm = this.fb.group({
       name: ['', Validators.required ],
       lastname: ['', Validators.required ],
       email: ['', Validators.required ],
       number: [{value:'',disabled: !this.isChecked}, Validators.required ],
       password: ['', Validators.required ],
       confirmPassword: ['', Validators.required ]});
  }



  resetForm(form?: FormGroup) {
    form.reset();
  }

  validationUser(){
    if(this){

    }
  }

  addUser() {
    console.log(this.userForm);
    this.userService.postUser(this.userForm.value)
      .subscribe(res => {

        console.log(res);
        this.resetForm(this.userForm);
        this.router.navigate(['/signin']);
      },
        error => {
          console.log(error);
          //const {errors} = error;
          console.log(error.data)
        }
      )
  }

  checkValue(event: boolean) {
    const number = this.userForm.get('number');
    if (!event) {
      this.isChecked = true;
      number.enable();
      this.userService.selectedUser.number = "";
    }else{
      this.isChecked = false;
      number.disable();
    }
    console.log(this.isChecked);
  }

  getNumber(event){
    console.log(event);
  }

  onCountryChange(event){
    //console.log(event.dialCode)
    this.dialCode = "+"+event.dialCode;
  }

  numericOnly(event) {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }


}

