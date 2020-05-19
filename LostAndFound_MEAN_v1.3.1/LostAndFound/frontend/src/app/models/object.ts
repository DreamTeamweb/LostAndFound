export class Objet {
    constructor (id='',type='',latitude=-1,longitude=-1,description='',imagePath='',date='1968-11-16T00:00:00',user=''){
        this._id=id;
        this.type=type;
        this.latitude= latitude;
        this.longitude= longitude;
        this.description = description;
        this.imagePath = imagePath;
        this.date=new Date(date);
        this.user=user;
    }
    _id:string;
    type:string;
    latitude:number;
    longitude:number;
    description:string;
    imagePath:string;
    date: Date;
    user:string;

}
