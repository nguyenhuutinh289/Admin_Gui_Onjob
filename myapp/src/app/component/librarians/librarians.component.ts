import { Component, OnInit,OnDestroy } from '@angular/core';
import { LibrariansService } from './../../Services/librarians.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

import { Librarian } from './../../Models/librarians';

@Component({
  selector: 'app-librarians',
  templateUrl: './librarians.component.html',
  styleUrls: ['./librarians.component.css']
})
export class LibrariansComponent implements OnInit,OnDestroy {

  subcription: Subscription;
  listLib: Librarian[];

  lib : Librarian = new Librarian();

  name = '';


  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private libService: LibrariansService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.subcription = this.libService.getAllLib()
      .subscribe((data: Librarian[]) => {
        this.listLib = data;
        console.log(this.listLib);
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    if (this.subcription)
      this.subcription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  onSubmit(form){
    // console.log(form); 
     let libAdd = new Librarian(form.firstname, form.lastname, form.gender,form.phone,
      form.email,form.status,form.images);
      console.log(libAdd);
      
  }

}
