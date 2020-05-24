import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [UserService]
})
export class ContactComponent implements OnInit {

  constructor(private main: AppComponent, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.Connection();
  }

  Connection() {
    this.userService.getConnection()
      .subscribe(
        res => {
          console.log(res);
          this.main.logged = true;
        },
        error => {
          this.main.logged = false;
          console.log(error); this.router.navigate(['/signin'])
        })
  }
}
