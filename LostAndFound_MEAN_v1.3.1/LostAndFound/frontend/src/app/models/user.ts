export class User {
    constructor (id='',name='',lastname='',email='',date='1968-11-16T00:00:00',number='',password=''){
        this._id=id;
        this.name=name;
        this.lastname=lastname;
        this.email= email;
        this.number = number;
        this.password=password;
        this.date=new Date(date);
    }
    _id:string;
    name:string;
    lastname:string;
    email:string;
    number:string;
    password:string;
    date:Date;

}

