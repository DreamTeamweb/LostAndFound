import { Objet } from './../../models/object';
import { ObjectService } from './../../services/object.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-lost',
  templateUrl: './object-lost.component.html',
  styleUrls: ['./object-lost.component.scss'],
  providers:[ObjectService]
})
export class ObjectLostComponent implements OnInit {

  constructor(public objectService: ObjectService) { }
  
  ngOnInit(): void {
    this.getObjects();
  }

  getConnection(){
    this.objectService.getMessage()
    .subscribe(res=>{
      this.objectService.message = res as string;
      console.log(res);
    });
  }

  getObjects(){
    this.objectService.getObjects()
    .subscribe(res=>{
      this.objectService.objects = res as Objet[];
      console.log(this.objectService.objects);
    });
  };

  contacter(){
    if(confirm("Vous êtes sur que c'est bien votre objet et que vous souhaitez contacter la personne?")){

    }
  }

}
