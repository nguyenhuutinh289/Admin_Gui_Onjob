
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { PublisherService } from './../../Services/publisher.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Publisher } from './../../Models/publisher';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit, OnDestroy, AfterViewInit {
  subcription: Subscription;
  listPub: Publisher[];
  pub: Publisher = new Publisher();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  $: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  constructor(private pubService: PublisherService, private router: Router) { }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
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
    this.subcription = this.pubService.getPublishers()
      .subscribe((data: Publisher[]) => {
        this.listPub = data;
        this.rerender();
      });
  }
  idxDelete : number;
  deleteClick(idx : number){
    this.idxDelete = idx;
  }

  onDeleteLang() {
    let id = this.listPub[this.idxDelete].id;
      console.log(this.idxDelete); 
      console.log(id);
    this.subcription = this.pubService.deleteLang(id).subscribe(data => {
      this.loadData();
    });
  }
  onSubmit(NgForm: NgForm) {

    let form = NgForm.value;
    NgForm.reset();
    let pubAdd = new Publisher(form.name,
      form.email, form.phone, form.address);
    if (form.id === undefined) {
      this.pubService.addPub(pubAdd)
        .subscribe(e => {
          this.loadData();
        })
    }
    else {
      this.pubService.updatePub(pubAdd, form.id)
        .subscribe(data => {
          this.loadData();
        });
    }
  }

  setEdit(idx: number) {
    this.pub.id = this.listPub[idx].id;
    this.pub.name = this.listPub[idx].name;
    this.pub.email = this.listPub[idx].email;
    this.pub.phone = this.listPub[idx].phone;
    this.pub.address = this.listPub[idx].address;
  }
}
