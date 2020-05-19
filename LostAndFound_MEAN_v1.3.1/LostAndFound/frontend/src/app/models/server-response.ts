export class ServerResponse {
    constructor (success=true,message=''){
        this.success=success;
        this.message=message;
    }
    success:boolean;
    message:string;

}