import { Component, OnInit,ViewChild ,AfterViewInit } from '@angular/core';
import { TitleService } from '../../Services/title.service';
import { Subscription, Subject } from 'rxjs';
import { ShortTitle } from '../../Models/Title';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit,AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  constructor(private titleService: TitleService,
    private bookService: BookService,
  ) { }
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

  subcription: Subscription;
  subcriptionChange: Subscription;
  subscriptionBook: Subscription;
  subscriptionAdd: Subscription;
  subscriptionDelete: Subscription;
  subscriptionNew: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  $: any;

  book: Book = new Book();
  titleName: string; // lưu name của title để  hiển thị khi add

  public listItems: Array<ShortTitle>;
  public data: Array<ShortTitle>;
  public selectedItem: ShortTitle;
  public listBook: Book[] = new Array;
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.subcription = this.titleService.getAllShortTitle()
      .subscribe((data: ShortTitle[]) => {
        this.listItems = data;
        this.data = this.listItems.slice();
        this.selectedItem = this.listItems[0];
        this.titleName = this.selectedItem.name;
        this.book.titleId = this.selectedItem.id;
      });

    this.loadBook(1);
  }
  ngOnDestroy(): void {
    if (this.dtTrigger)
      this.dtTrigger.unsubscribe();

    if (this.subcription)
      this.subcription.unsubscribe;
    if (this.subcriptionChange)
      this.subcriptionChange.unsubscribe;
    if (this.subscriptionBook)
      this.subscriptionBook.unsubscribe;
    if (this.subscriptionNew)
      this.subscriptionNew.unsubscribe;
    if (this.subscriptionAdd)
      this.subscriptionAdd.unsubscribe;
    if (this.subscriptionDelete)
      this.subscriptionDelete.unsubscribe;


  }

  loadBook(id : number) {
      this.subcriptionChange = this.bookService.getBookByTitle(id).subscribe((data: Book[]) => {
        this.listBook = data;
        console.log(this.listBook);
     this.rerender();
      });
  }


  selectionChange(title) {
    console.log(title.id);
    this.loadBook(title.id);
    this.book.titleId = title.id; // gán title id cho title id trong book để có titleid khi thêm
    this.titleName = title.name; //gán titleName để hiển thị khi thêm
  }

  handleFilter(value) {
    this.data = this.listItems.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  addBook(Form: NgForm) {
    let ngForm: Book = Form.value;
  //  Form.reset();
    if (this.book.barCode === undefined)
      this.book.quantity = ngForm.quantity;

    this.book.type = ngForm.type;
    this.book.status = ngForm.status;
    this.book.page = ngForm.page;
    this.book.shelveID = ngForm.shelveID;

    this.bookService.addBook(this.book)
      .subscribe(e => {
        this.loadBook(this.book.titleId);
      });

  }

  setEdit(idx) {
    this.book = new Book();
    this.book = this.listBook[idx];
    this.book.titleId = this.selectedItem.id;
    // this.book.page = this.listBook[idx].page;
    // this.book.type = this.listBook[idx].type;
    // this.book.status = this.listBook[idx].status;
    // this.book.shelveID = this.listBook[idx].shelveID;
    this.titleName = this.selectedItem.name;
    console.log(this.book);

  }
  idDelete: number;
  deleteClick(id: number) {
    this.idDelete = id;
  }
  delete() {
    console.log(this.idDelete);
    this.subscriptionDelete = this.bookService.deleteBook(this.idDelete)
      .subscribe(e => {
        this.loadBook(this.book.titleId);
      });
  }
  addClick() {
    this.book = new Book();
    this.book.titleId = this.selectedItem.id;
    console.log(this.book.barCode);
  }
}
