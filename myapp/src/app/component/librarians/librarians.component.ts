import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LibrariansService } from './../../Services/librarians.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Librarian } from './../../Models/librarians';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-librarians',
  templateUrl: './librarians.component.html',
  styleUrls: ['./librarians.component.css']
})
export class LibrariansComponent implements OnInit, OnDestroy {
  subcription: Subscription;
  listLib: Librarian[];
  lib: Librarian = new Librarian();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
    $ :any;

  constructor(private libService: LibrariansService, private router: Router) { }

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
    this.subcription = this.libService.getAllLib()
      .subscribe((data :Librarian[]) => {
        this.listLib = data;   
        this.dtTrigger.next();  
        $.fn.dataTable.ext.errMode = 'throw';
      });
  }


  onSubmit(NgForm: NgForm) {

    let form = NgForm.value;
    NgForm.reset();
     let libAdd = new Librarian(form.firstname, form.lastname, JSON.parse(form.gender), form.phone,
       form.email, JSON.parse(form.status), form.images);
       console.log(libAdd);
    if (form.id === undefined) {
       this.libService.addLib(libAdd);
       this.listLib.unshift(libAdd);
    }
    else {
       this.libService.updateLib(libAdd, form.id)
         .subscribe(data => {
           console.log(data);
           this.loadData();
         });
    }
  }

  setEdit(idx: number) {
    // console.log(idx);
    this.lib.id = this.listLib[idx].id;
    this.lib.firstName = this.listLib[idx].firstName;
    this.lib.lastName = this.listLib[idx].lastName;
    this.lib.gender = this.listLib[idx].gender;
    this.lib.phone = this.listLib[idx].phone;
    this.lib.email = this.listLib[idx].email;
    this.lib.status = this.listLib[idx].status;
    // this.lib.images = this.listLib[idx].images;
   
  }

}
