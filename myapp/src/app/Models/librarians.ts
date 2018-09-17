export class Librarian {
    id: string;
    firstName: string;
    lastName: string;
    gender: number;
    phone: string;
    email: string;
    status: boolean;
    images: string;


    constructor(firstname?: string, lastname?: string, gender: number = 1,
        phone?: string, email?: string, status: boolean = true, images?: string) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.images = images;

    };

}