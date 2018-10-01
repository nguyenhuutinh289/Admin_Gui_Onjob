
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AuthorService } from './../../Services/author.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Author } from './../../Models/author';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  subcription: Subscription;
  listLib: Author[];
  lib: Author = new Author();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
    $ :any;

  constructor(private libService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
    this.loadData();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadData() {
    this.subcription = this.libService.getAlllib()
      .subscribe((data :Author[]) => {
        this.listLib = data;   
        this.dtTrigger.next();  
        $.fn.dataTable.ext.errMode = 'throw';
      });
  }


  onSubmit(NgForm: NgForm) {

    let form = NgForm.value;
    NgForm.reset();
 
     let libAdd = new Author(form.firstname, form.lastname);
    if (form.id === undefined) {
       console.log('undefined---');
       console.log(libAdd);
       this.libService.addlib(libAdd);
       this.listLib.unshift(libAdd);
    }
    else {
     console.log(libAdd);
      console.log(form.id);
        this.libService.updatelib(libAdd, form.id)
         .subscribe(data => {
           console.log(data);
           this.loadData();
         });
    }
  }

  idxDelete : number;
  deleteClick(idx : number){
    console.log(idx);
    this.idxDelete = idx;
  }
  onDeleteLang(){
    let id = this.listLib[this.idxDelete].id;
     console.log(this.idxDelete); 
     console.log(id);
    this.subcription= this.libService.deleteLang(id).subscribe(data=>{
    console.log(data);
    this.listLib.splice(this.idxDelete,1);
     });
   }
  setEdit(idx: number) {
    this.lib.id = this.listLib[idx].id;
    this.lib.firstName = this.listLib[idx].firstName;
    this.lib.lastName = this.listLib[idx].lastName;
  }
}
