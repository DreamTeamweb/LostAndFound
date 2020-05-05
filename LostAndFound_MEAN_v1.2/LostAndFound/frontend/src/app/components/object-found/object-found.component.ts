import { ObjectService } from './../../services/object.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-object-found',
  templateUrl: './object-found.component.html',
  styleUrls: ['./object-found.component.scss'],
  providers: [ObjectService]
})
export class ObjectFoundComponent implements OnInit {

  constructor(public objectService: ObjectService, private router: Router, private main: AppComponent) { }
  type = "";

  ngOnInit(): void {
    this.Connection();
  }

  resetForm(form?: NgForm) {
    form.reset();
  }

  Connection() {
    this.objectService.getConnection()
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

  validationData(form: NgForm) {
    const errors = [];
    if (form.value.type == "1" || form.value.type == "2" || form.value.type == "3" || form.value.type == "4" || form.value.type == "5") {
      if (form.value.description.length != 0) {
        if (form.value.location.length != 0) {
          this.addObject(form);
        } else {
          errors.push("Inderez une localisation");
        }
      } else {
        errors.push("Inserez une description");
      }
    } else {
      errors.push("Selectionnez un type d'objet");
    }
    console.log(errors);
  }

  addObject(form: NgForm) {
    console.log(form);
    this.objectService.postObject(form.value)
      .subscribe(
        res => {
          console.log(res);
          this.resetForm(form);
          this.router.navigate(['/object-lost']);
        },
        error => console.log(error))
  };

  onItemChange(value) {
    this.type = value;
    console.log(" Value is : ", this.type);
  }



}
