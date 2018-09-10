export class Librarian {
    id:        string;
    firstname: string;
    lastname:  string;
    gender:    number;
    phone?:     string;
    email?:     string;
    status:    boolean;
    images?:    string;

    /**
     *
     */
    constructor(firstname : string, lastname : string, gender : number,
         phone : string, email:string,status:boolean,images : string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.images  = images;
        
    }
}