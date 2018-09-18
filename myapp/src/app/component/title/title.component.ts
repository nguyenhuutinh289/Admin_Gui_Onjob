import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../Services/title.service';
import { AuthorViewFullName } from '../../Models/authorViewFullName';
import { Subscription, Subject } from 'rxjs';
import { Title, ShortTitle, TitleViewModel } from '../../Models/Title';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../Services/author.service';
import { CategoryService } from '../../Services/category.service';
import { CategoryView } from '../../Models/categoryView';
import { LanguageView } from '../../Models/languageView';
import { PublisherView } from '../../Models/publisherView';
import { PublisherService } from '../../Services/publisher.service';
import { LanguageService } from '../../Services/language.service';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnDestroy {

  constructor(private titleService: TitleService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private publisherService: PublisherService) { }

  title = new Title();

  public authorsAPI: AuthorViewFullName[];
  authorsName: string[] = [];
  authorsID: number[] = [];

  categoriesAPI: CategoryView[];
  categoriesName: string[] = [];
  categoriesID: number[] = [];

  languagesAPI: LanguageView[];
  publishersAPI: PublisherView[];

  arrShortTitle: ShortTitle[];

  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};

  subscription: Subscription
  subscriptionTitle: Subscription;
  subscriptionAuthor: Subscription;
  subscriptionCategory: Subscription;
  subscriptionLanguage: Subscription;
  subscriptionPublisher: Subscription;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
    this.loadData();
    this.loadPublisher();
    this.loadLanguage();
    this.loadAuthorFullName();
    this.loadCategoryName();
  }

  loadData() {
    this.subscription = this.titleService.getAllShortTitle().subscribe((arrayTitle: ShortTitle[]) => {
      this.arrShortTitle = arrayTitle;
      //console.log( this.arrShortTitle);
      this.dtTrigger.next();
    });
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


  viewDetail(id: number) {

  }

  setEditTitle(listAuthorsId: number[], listCategoriesId: number[], title: Title) {

    this.authorsID = listAuthorsId;
    this.categoriesID = listCategoriesId;
    this.title = title;
    for (const id of listAuthorsId) {
      let auName = this.authorsAPI.find(a => a.id == id).fullName;
      this.authorsName.push(auName);
    }

    for (const id of listCategoriesId) {
      let cateName = this.categoriesAPI.find(a => a.id == id).name;
      this.categoriesName.push(cateName);
    }


  }

  addClick(){

    this.authorsID.length = this.categoriesID.length
     = this.authorsName.length = this.categoriesName.length = 0;
  }

  editClick(id: number) {
    this.subscriptionTitle = this.titleService.getTitleViewById(id)
      .subscribe((data: TitleViewModel) => {
        this.setEditTitle(data.authors, data.categories, data.title);
      });
  }

  delTitle(id: number) {

  }

  /// -------------- xử lý nhiều  authors cho 1 title  
  //#region    
  loadAuthorFullName() {
    this.subscriptionAuthor = this.authorService.getFullNameAuthor()
      .subscribe((data: AuthorViewFullName[]) => {
        this.authorsAPI = data;
        console.log(data);
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


  addTitle(ngForm: NgForm) {

    let title: Title = ngForm.value;
    // console.log(title);
    // console.log(this.authorsID);
    // console.log(this.categoriesID);

      this.titleService.addTitle(title,this.authorsID,this.categoriesID);
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
  }

}
