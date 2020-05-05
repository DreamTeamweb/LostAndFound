
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

  contacter() {
    if (confirm("Vous êtes sur que c'est bien votre objet et que vous souhaitez contacter la personne?")) {

    }
  };

  setIdUser(id:string){
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

}


