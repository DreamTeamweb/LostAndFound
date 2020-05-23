import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { Objet } from './../../models/object';
import { ObjectService } from './../../services/object.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-object-lost',
  templateUrl: './object-lost.component.html',
  styleUrls: ['./object-lost.component.scss'],
  providers: [ObjectService,
  UserService]
})
export class ObjectLostComponent implements OnInit {
  user = new User();
  latitude=-1;
  longitude=-1;
  showModalContent=1;// 1 = contact info , 2 = map info , 3= image preview
  zoom=18;
  path:string;

  selectedType = -1;
  selectedDescription = [""];
  selectedDate = '1968-11-16T00:00:00';

  isChecked = false;
  filter_arr = [];
  arrayAAfficher = [];

  constructor(public objectService: ObjectService, private router: Router, private main: AppComponent, public userService: UserService) { }

  ngOnInit(): void {
    this.getObjects();
  }

  getConnection() {
    this.objectService.getMessage()
      .subscribe(res => {
        this.objectService.message = res as string;
        console.log(res);
      });
  }



  getObjects() {
    this.objectService.getObjects()
      .subscribe(res => {
        this.objectService.objects = res as Objet[];
        this.arrayAAfficher = this.objectService.objects;
        this.main.logged = true;
        console.log(this.objectService.objects)
      },
        error => this.router.navigate(['/signin'])
      )
  };

  setIdUser(id:string){
    this.showModalContent=1;
    console.log('Id:'+id);
    this.user._id = id;
  }

  getUserData(user: string) {
    console.log('Get user data: '+user);
    this.userService.getUser(user)
      .subscribe(res => {
        this.user = res as User;
        console.log(user)
      },
        error => console.log("Request error")
      )
  };

  selectModal(latitude:number,longitude:number){
    this.showModalContent=2;
    this.latitude=latitude;
    this.longitude=longitude;
  }

  previewImage(path: string){
      this.showModalContent=3;
      this.path = path;

  }

  getCheckBox(event){
    this.isChecked = event as boolean;
  }

  filter() {
    // Declare variables
    var filter_type,
      filter_keyword,
      filter_date;

    this.selectKeyWords();
    this.selectDate();
    this.selecType();

    filter_type = this.selectedType;
    filter_keyword = this.selectedDescription;
    filter_date = this.selectedDate;


    this.filter_arr = [];
    // Loop through all list items, and hide those who don't match the search query

    var _j = 0 ;
    for(var _i=0; _i< this.objectService.objects.length ; _i++) {

      var isEvery = filter_keyword.every(item_str => this.objectService.objects[_i].description.includes(item_str));

      console.log("type : " + (this.objectService.objects[_i].type == filter_type || filter_type == -1));
      console.log("description : " + isEvery);
      console.log("date : " + this.objectService.objects[_i].date >= filter_date);

      if (
        (this.objectService.objects[_i].type == filter_type || filter_type == -1) &&
        isEvery &&
        this.objectService.objects[_i].date >= filter_date ) {

        this.filter_arr[_j] = this.objectService.objects[_i];
        _j++;
      }
    }

    this.arrayAAfficher = this.filter_arr;

  }

  selecType() {
    var a = (<HTMLInputElement>document.getElementById("select_type")).value as unknown;
    this.selectedType = a as number;
  }

  selectKeyWords() {
    var keyword_value;
    keyword_value = (<HTMLInputElement>document.getElementById("myInput_keyword")).value;
    keyword_value = String(keyword_value);
    this.selectedDescription = keyword_value.split(" ");

  }

  selectDate(){
    this.selectedDate = (<HTMLInputElement>document.getElementById("myInput_date")).value;
  }

}



