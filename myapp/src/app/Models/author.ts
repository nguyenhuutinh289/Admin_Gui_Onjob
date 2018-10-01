export class Author {
    id: string;
    firstName: string;
    lastName: string;
    
    constructor(firstname?: string, lastname?: string) {
        this.firstName = firstname;
        this.lastName = lastname;
    };

}