import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Lost and found';
  logged = false;
  constructor(private user: UserService, private router: Router) {
  }

  logout() {
    this.user.logout()
      .subscribe(
        data => {
          console.log(data);
          this.logged = false;
          this.router.navigate(['/signin'])
        },
        error => console.error(error)
      )
  }
}
