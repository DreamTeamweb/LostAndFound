import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ObjectService } from './../../services/object.service';
import { Objet } from './../../models/object';
import { User } from 'src/app/models/user';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ObjectService, UserService]
})
export class HomeComponent implements OnInit {
  user = new User();
  objects: Objet[];
  type: string;
  hour: number;
  action: string;
  auxiliar: any;
  fixedNumber:string;
  editNumberForm: boolean;
  successMessage: string;
  constructor(public objectService: ObjectService, private router: Router, public userService: UserService, private main: AppComponent) {
    this.getHomeUserData();
    this.objects = [];
    this.type = "";
    this.action = "";
    this.editNumberForm = false;
  }

  ngOnInit(): void {
    var date = new Date();
    this.hour = date.getHours();
    console.log(this.hour)
  }

  showEditNumber() {
    if (this.editNumberForm) {
      this.editNumberForm = false;
      this.user.number=this.fixedNumber;
    } else {
      this.editNumberForm = true;
    }
  }


  resetForm(form?: NgForm) {//If i have a form
    form.reset();
    this.objectService.selectedObject = new Objet();
  }

  getHomeUserData() {
    this.userService.getUserHome()
      .subscribe(
        data => {
          console.log(data);
          this.user = data as User;
          this.getObjectsUser(this.user._id);
          this.main.logged = true;
          this.fixedNumber = this.user.number;
        },
        error => {
          this.router.navigate(['/signin'])
            , this.main.logged = false;
        }
      )
  }

  getObjectsUser(user: string) {
    console.log('Get objects data: ' + user);
    this.objectService.getObjectsUser(user)
      .subscribe(res => {
        this.objects = res as Objet[];
        console.log(this.objects.length)
      },
        error => console.log("Request error")
      )
  };


  getObject(id: string) {
    console.log(id);
    this.objectService.selectedObject = this.objects.find(({ _id }) => _id === id);
    console.log(this.objectService.selectedObject);
  }

  onItemChange(value) {
    this.type = value;
    console.log(" Value is : ", this.type);
  }

  validation(form: NgForm) {

    this.confirmationAction(form, 1);
  }

  confirmationAction(param: any, opt: number) {
    this.action = "modifier";
    console.log(opt);
    console.log(param);
    if (opt == 2) {
      console.log("1st sup")
      this.action = "supprimer";
    }
    this.auxiliar = param;
  }

  updateObjectHome(form: NgForm) {
    this.objectService.putObject(form.value)
      .subscribe(res => {
        //this.resetForm(form);
        console.log("Object updated");
        this.resetForm(form);
        this.getObjectsUser(this.user._id);
        console.log(res);
      }, error => {
        console.log("error update")
      })
  }

  deleteObject(id: string) {
    this.objectService.deleteObject(id)
      .subscribe(res => {
        //this.resetForm(form);
        console.log("Object deleted")
        this.getObjectsUser(this.user._id);
        console.log(res);
      }, error => {
        console.log("error deleted")
      })
  }

  executerAction() {
    if (this.action == "modifier") {
      this.updateObjectHome(this.auxiliar as NgForm);
      document.getElementById('confirmationCancel').click();
      document.getElementById('modifyCancel').click();
    } else {
      //console.log("Escogio suprimir")
      document.getElementById('confirmationCancel').click();
      this.deleteObject(this.auxiliar as string);
    }
  }

  updateUser(form:NgForm) {
    console.log(form);
    this.userService.putUser(form.value)
      .subscribe(res => {
        //this.resetForm(form);
        console.log("user updated");
        const {number} = form.value;
        this.user.number= number;
        this.fixedNumber=this.user.number;
        document.getElementById('editNumberBtn').click();
        console.log(res);
      }, error => {
        console.log("user update error")
      })
  }

}
