
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LanguageService } from './../../Services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Language } from './../../Models/language';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-langguages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, OnDestroy, AfterViewInit {
  subcription: Subscription;
  listLang: Language[];
  lang: Language = new Language();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  $: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  constructor(private langService: LanguageService, private router: Router) { }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

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
    this.subcription = this.langService.getAllLanguage()
      .subscribe((data: Language[]) => {
        console.log(data);
        this.listLang = data;
        this.rerender();
        //  this.dtTrigger.next();  
        //  $.fn.dataTable.ext.errMode = 'throw';
      });
  }

  idxDelete: number;
  onCheckDelete(idx: number) {
    // console.log(idx);
    this.idxDelete = idx;
  }
  onDeleteLang() {
    let id = this.listLang[this.idxDelete].id;
    //   console.log(this.idxDelete); 
    // console.log(id);
    this.subcription = this.langService.deleteLang(id).subscribe(data => {
      this.loadData();
    });
  }

  onSubmit(NgForm: NgForm) {

    let form = NgForm.value;
    NgForm.reset();
    let langAdd = new Language(form.name);
  //  console.log(langAdd);
    if (form.id === undefined) {
      // console.log('undefined---');
      this.langService.addLang(langAdd)
        .subscribe(e => {
          this.loadData();
        });
      //  this.listLang.unshift(langAdd);

    }
    else {
      this.langService.updateLang(langAdd, form.id)
        .subscribe(data => {
        //  console.log(data);
          this.loadData();
        });
    }
  }
  setEdit(idx: number) {

    this.lang.id = this.listLang[idx].id;
    this.lang.name = this.listLang[idx].name;

  }

}
