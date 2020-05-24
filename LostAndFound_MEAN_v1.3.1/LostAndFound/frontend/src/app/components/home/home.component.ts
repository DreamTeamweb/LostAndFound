import { NgForm,FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ObjectService } from './../../services/object.service';
import { Objet } from './../../models/object';
import { User } from 'src/app/models/user';
import { AppComponent } from 'src/app/app.component';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ObjectService, UserService]
})
export class HomeComponent implements OnInit {
  user = new User();
  objects: Objet[];
  typeT: string;
  hour: number;
  action: string;
  auxiliar: any;
  fixedNumber: string;
  editNumberForm: boolean;
  latitude: number;
  longitude: number;
  locationChosen:boolean;
  zoom:number;
  showModalMap:boolean;
  file:File;
  dialCode = "+33";
  dialCodeF:string;
  changedFlag= false;
  numberForm:FormGroup;

  constructor(public objectService: ObjectService, private router: Router, public userService: UserService, private main: AppComponent, private f: FormBuilder,private imageCompress: NgxImageCompressService) {
    this.getHomeUserData();
    this.objects = [];
    this.action = "";
    this.latitude=-1;
    this.longitude=-1;
    this.locationChosen=false;
    this.showModalMap=false;
    this.editNumberForm = false;
    this.zoom=18;
  }

  

  ngOnInit(): void {
    var date = new Date();
    this.hour = date.getHours();
    //console.log(this.hour)
    if(!this.user.number){
      this.dialCode ="+33";
    }
  }

  showEditNumber(action:boolean) {
    if (this.editNumberForm) {
      this.editNumberForm = false;
      this.user.number = this.fixedNumber;
    } else {
      this.editNumberForm = true;
    }
    if(!action){
      this.dialCode = this.dialCodeF;
      this.changedFlag = false;
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
          //console.log(data);
          this.user = data as User;
          this.getObjectsUser(this.user._id);
          this.dialCode = this.user.number.substr(0,this.user.number.indexOf(' '));
          this.dialCodeF = this.dialCode;
          this.user.number = this.user.number.substr(this.user.number.indexOf(' ')+1);
          this.main.logged = true;
          if(!this.user.number){
            this.dialCode ="+33";
          }
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
        //console.log(this.objects.length)
      },
        error => console.log("Request error")
      )
  };


  getObject(id: string) {
    //console.log(id);
    
    this.objectService.selectedObject = this.objects.find(({ _id }) => _id === id);
    this.typeT = this.objectService.selectedObject.type;
    this.latitude=this.objectService.selectedObject.latitude;
    this.longitude=this.objectService.selectedObject.longitude;
    this.showModalMap=false;
  }

  dismissModal(){
    this.objectService.selectedObject.latitude=this.latitude;
    this.objectService.selectedObject.type = this.typeT;
    this.objectService.selectedObject.longitude=this.longitude;
  }

  onItemChange(value) {

  }

  validation(form: NgForm) {
    if (!form.controls['description'].value) {
      //this.errors.push("Insérez une description");
      document.getElementById('description').style.borderColor = "red";
      document.getElementById("message").style.display = "block";
    } else {
      document.getElementById('description').style.borderColor = "green";
      document.getElementById("message").style.display = "none";
      this.confirmationAction(form, 1);
    }

  }

  confirmationAction(param: any, opt: number) {
    this.action = "modifier";
    //console.log(opt);
    //console.log(param);
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

  updateUser(form: NgForm) {
    if(!this.changedFlag){
      this.dialCode = "+33";
    }
    form.controls['number'].setValue(this.dialCode+" "+form.controls['number'].value)
    console.log(form);
    this.userService.putUser(form.value)
      .subscribe(res => {
        this.dialCode = this.user.number.substr(0,this.user.number.indexOf(' '));  
        this.user.number = this.user.number.substr(this.user.number.indexOf(' ')+1);
        this.fixedNumber = this.user.number;
        this.dialCodeF = this.dialCode;
        document.getElementById('editNumberBtn').click();
        this.changedFlag = false;
        console.log(res);
      }, error => {
        console.log("user update error")
      })
  }

  onChoseLocation(event){
    this.objectService.selectedObject.latitude = event.coords.lat;
    this.objectService.selectedObject.longitude = event.coords.lng;
  }


  setLocationModal(latitude:number, longitude:number){
    this.latitude = latitude;
    this.longitude= longitude;
    this.showModalMap=true;
  }

  onPhotoSelected(event):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
    }
  }

  onCountryChange(event) {
    this.changedFlag = true;
    this.dialCode = "+" + event.dialCode;
  }

  numericOnly(event) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    const long = this.user.number.length;
    if(long == 2 || long == 5 || long == 8 || long == 11){
      this.user.number = this.user.number + " "; 
    }
    if(long == 14){
      return false;
    }
    return result;
  }


}
