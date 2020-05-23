import { ObjectService } from './../../services/object.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NgxImageCompressService } from 'ngx-image-compress';




@Component({
  selector: 'app-object-found',
  templateUrl: './object-found.component.html',
  styleUrls: ['./object-found.component.scss'],
  providers: [ObjectService]
})

export class ObjectFoundComponent implements OnInit {
  latitude = 45.7830095;
  longitude = 4.8790041;
  latitudeMarker: number;
  longitudeMarker: number;
  locationChosen = false;
  errors = [];
  file: File;//image
  descriptionValid: true;
  zoom = 15;
  minZoom = 10;
  localCompressedURl: string;
  sizeOFCompressedImage: number;

  constructor(public objectService: ObjectService, private router: Router, private main: AppComponent,private imageCompress: NgxImageCompressService) { }
  typeT = "";

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

  validationData(description: HTMLInputElement) {
    this.errors = [];
    if (this.typeT != "1" && this.typeT != "2" && this.typeT != "3" && this.typeT != "4" && this.typeT != "5" && this.typeT != "6") {
      this.errors.push("Sélectionnez un type d'objet");
    }
    if (!description.value) {
      //this.errors.push("Insérez une description");
      description.style.borderColor = "red";
      document.getElementById("message").style.display = "block";
    } else {
      description.style.borderColor = "green";
      document.getElementById("message").style.display = "none";
    }
    if (!this.locationChosen) {
      this.errors.push("Insérez une localisation");
    }
    if (!this.file) {
      this.errors.push("Insérez une image")
      document.getElementById("inputPhoto").style.borderColor = "red";
    } else {
      document.getElementById("inputPhoto").style.borderColor = "green";
    }
    if (this.errors.length == 0) {
      this.addObject(description.value);

    }
    console.log(this.errors);
  }

  addObject(description: string) {
    this.objectService.postObject(this.typeT, this.latitudeMarker, this.longitudeMarker, description, this.file)
      .subscribe(
        res => {
          console.log(res);
          //this.resetForm(form);
          this.router.navigate(['/object-lost']);
        },
        error => console.log(error))
  };

  onItemChange(value) {
    this.typeT = value;
    console.log(" Value is : ", this.typeT);
  }

  //set localisation marker (agm-marker)
  onChoseLocation(event) {
    console.log(event);
    this.latitudeMarker = event.coords.lat;
    this.longitudeMarker = event.coords.lng;
    this.locationChosen = true;
  }

  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        //this.photoSelected = reader.result
        this.compressFile(event.target.result,this.file['name'])//Compress image
      };
      reader.readAsDataURL(this.file);
    }
  }

  //Compress image
  //*************Verifier la taile des images avant compresser, width, height********
  //Verifier la taille en bytes < 5Mb
  //Ver un back_up
  compressFile(image,fileName) {
    var orientation = -1;
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          const imgResultAfterCompress = ""+result;
          this.localCompressedURl = result;
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);
          this.file = new File([imageBlob], imageName, { type: 'image/png' });
          console.log("file size:",this.file['size']/(1024*1024));
        }
      );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
 }
}
