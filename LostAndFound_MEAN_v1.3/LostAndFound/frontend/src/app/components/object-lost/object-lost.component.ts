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

}


