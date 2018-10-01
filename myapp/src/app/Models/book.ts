 export class Book{
     id : number;
     quantity : number;
     barCode : string;
     type : boolean;
     page : number;
     status : boolean;
     shelveID : number;
     titleId : number;

     /**
      *
      */
     constructor( quantity? : number, type : boolean = false, page? : number, status : boolean = true,
         shelveID? : number, titleID? : number) {
         this.quantity = quantity;
         this.type = type;
         this.page = page;
         this.status = status;
         this.shelveID = shelveID;
         this.titleId = titleID
     }

 }