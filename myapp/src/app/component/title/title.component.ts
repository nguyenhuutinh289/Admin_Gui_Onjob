import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { getDate, addDays } from '@progress/kendo-date-math';

import { TitleService } from '../../Services/title.service';
import { AuthorViewFullName } from '../../Models/authorViewFullName';
import { Subscription } from 'rxjs';
import { Title, TitleViewModel, GetFullTitle } from '../../Models/Title';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../Services/author.service';
import { CategoryService } from '../../Services/category.service';
import { CategoryView } from '../../Models/categoryView';
import { LanguageView } from '../../Models/languageView';
import { PublisherView } from '../../Models/publisherView';
import { PublisherService } from '../../Services/publisher.service';
import { LanguageService } from '../../Services/language.service';
import { PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';



@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnDestroy {

  value: Date = new Date();

  public pageSize = 5;
  public skip = 0;
  public gridView: GridDataResult;

  private items: GetFullTitle[];

  constructor(private titleService: TitleService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private publisherService: PublisherService,
    private bookService: BookService) { }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }


  private loadItems(): void {
    this.subscription = this.titleService.getFullTitle().subscribe((arrayTitle: GetFullTitle[]) => {
      this.items = arrayTitle;
      console.log(arrayTitle);
      this.gridView = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
      };
    });
  }

  title = new Title();
  book = new Book();

  authorsAPI: AuthorViewFullName[];
  authorsName: string[] = [];
  authorsID: number[] = [];

  categoriesAPI: CategoryView[];
  categoriesName: string[] = [];
  categoriesID: number[] = [];

  languagesAPI: LanguageView[];
  publishersAPI: PublisherView[];

  arrayTitleFull: GetFullTitle[];


  subscriptionT: Subscription
  subscription: Subscription;
  subscriptionTitle: Subscription;
  subscriptionAuthor: Subscription;
  subscriptionCategory: Subscription;
  subscriptionLanguage: Subscription;
  subscriptionPublisher: Subscription;

  subscriptionBook: Subscription;

  ngOnInit(): void {
    this.loadItems();
    this.loadPublisher();
    this.loadLanguage();
    this.loadAuthorFullName();
    this.loadCategoryName();
  }

  loadLanguage() {
    this.subscriptionLanguage = this.languageService.getAllLanguage()
      .subscribe((data: LanguageView[]) => {
        this.languagesAPI = data;
        //  console.log(this.languagesAPI);

      });
  }

  loadPublisher() {
    this.subscriptionPublisher = this.publisherService.getAllPublisher()
      .subscribe((data: PublisherView[]) => {
        this.publishersAPI = data;
        // console.log(this.publishersAPI);

      });
  }

  click(e) {
    e.preventDefault();
    (<any>$('a[href="#tab"]')).tab('show');
  } // click chuyển tabs


  setEditTitle(listAuthorsId: number[], listCategoriesId: number[], title: Title) {

    this.authorsID = listAuthorsId;
    this.categoriesID = listCategoriesId;
    this.title = title;

    this.value = new Date(this.title.publishingDate);

    for (const id of listAuthorsId) {
      let auName = this.authorsAPI.find(a => a.id == id).fullName;
      this.authorsName.push(auName);
    }

    for (const id of listCategoriesId) {
      let cateName = this.categoriesAPI.find(a => a.id == id).name;
      this.categoriesName.push(cateName);
    }

  }

  addClick() {
    this.title = new Title();
    this.value = new Date();
    this.authorsID.length = this.categoriesID.length
      = this.authorsName.length = this.categoriesName.length = 0;
  }

  editClick(id: number) {
    this.addClick();
    this.subscriptionTitle = this.titleService.getTitleViewById(id)
      .subscribe((data: TitleViewModel) => {
        this.setEditTitle(data.authors, data.categories, data.title);
      });
  }

  delTitle(id: number) {
    this.subscriptionTitle = this.titleService.delete(id)
      .subscribe(data => { },
        err => console.log("lỗi"),
        () => {
          this.loadItems();
        }
      );

    //console.log(`"id dc click la : " ${id}`);
  }



  /// -------------- xử lý nhiều  authors cho 1 title  
  //#region    
  loadAuthorFullName() {
    this.subscriptionAuthor = this.authorService.getFullNameAuthor()
      .subscribe((data: AuthorViewFullName[]) => {
        this.authorsAPI = data;
        //  console.log(data);
      });
  } // load danh sách author với fullname

  addAuthorID(id: number) {
    //  console.log(id);
    let authorName = this.authorsAPI.find(x => x.id == id).fullName;
    // console.log(authorName);
    this.authorsName.push(authorName); // add tên tác giả vào mảng tạm để hiển thị
    this.authorsID.push(id);
  }

  delAuthorID(idx: number) {
    this.authorsName.splice(idx, 1);
    this.authorsID.splice(idx, 1);
  }
  //#endregion
  /// ---------------- end xử lý author


  // -------------- xử lý nhiều category cho 1 title

  //#region 
  loadCategoryName() {
    this.subscriptionCategory = this.categoryService.getAllCategory()
      .subscribe((data: CategoryView[]) => {
        this.categoriesAPI = data;
        //  console.log(data);
      });
  } // load danh sách author với fullname

  addCategoryID(id: number) {
    //  console.log(id);
    let cateName = this.categoriesAPI.find(x => x.id == id).name;
    // console.log(authorName);
    this.categoriesName.push(cateName); // add tên tác giả vào mảng tạm để hiển thị
    this.categoriesID.push(id);
  }

  delCategoryID(idx: number) {
    this.categoriesName.splice(idx, 1);
    this.categoriesID.splice(idx, 1);
  }

  //#endregion
  //---------------end xử lý cate


  calc(): Date {
    console.log(this.value);
    return this.value;
  }

  addTitle(ngForm: NgForm) {
    let title: Title = ngForm.value;
    title.publishingDate = this.calc();
    this.titleService.addTitle(title, this.authorsID, this.categoriesID)
      .subscribe(e => {
        this.titleService.getAllShortTitle().subscribe(e => {
          this.loadItems();
        });
      });

  }


  ngOnDestroy(): void {
    if (this.subscriptionAuthor) {
      this.subscriptionAuthor.unsubscribe();
    }
    if (this.subscriptionTitle) {
      this.subscriptionTitle.unsubscribe();
    }
    if (this.subscriptionCategory) {
      this.subscriptionCategory.unsubscribe();
    }
    if (this.subscriptionLanguage) {
      this.subscriptionLanguage.unsubscribe();
    }
    if (this.subscriptionPublisher) {
      this.subscriptionPublisher.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTitleId(titleId: number) {
    this.book.titleId = titleId;
  }

  addBook(ngForm) {

    if (this.book.barCode === undefined)
      this.book.quantity = ngForm.quantity;

    this.book.page = ngForm.page;
    this.book.type = ngForm.type;
    this.book.status = ngForm.status;
    this.book.shelveID = ngForm.shelvesID;

    this.subscriptionBook = this.bookService.addBook(this.book)
      .subscribe((data: Book) => {
        console.log(data);
      });

  }
}
