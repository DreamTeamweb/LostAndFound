export class Objet {
    constructor (id='',type='',location='',description='',date='1968-11-16T00:00:00'){
        this._id=id;
        this.type=type;
        this.location= location;
        this.date=new Date(date);
        this.description = description;
    }
    _id:string;
    type:string;
    location:string;
    description:string;
    date: Date

}
