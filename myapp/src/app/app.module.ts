import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {DataTablesModule} from 'angular-datatables'
import {HttpClientModule} from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule , Routes} from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { AppComponent } from './app.component';

import { MenuComponent } from './component/menu/menu.component';
import { TopNavMenuComponent } from './component/top-nav-menu/top-nav-menu.component';
import { HomeComponent } from './component/home/home.component';
import { TitleComponent } from './component/title/title.component';
import { LibrariansComponent } from './component/librarians/librarians.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { AuthorComponent } from './component/authors/authors.component';
import { PublisherComponent } from './component/publisher/publisher.component';
import { LanguagesComponent } from './component/languages/languages.component';

import { BooksComponent } from './component/books/books.component';
import { BorrowComponent } from './component/borrow/borrow.component';



const routerConfig : Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'title', component : TitleComponent},
  {path: 'books', component : BooksComponent},
  {path: 'librarians', component : LibrariansComponent},
  {path: 'publishers', component : PublisherComponent},
  {path: 'authors', component : AuthorComponent},
  {path: 'languages', component : LanguagesComponent},
  {path: 'categories', component : CategoriesComponent},
  {path: 'borrow', component : BorrowComponent},
  {path:'',redirectTo :'/home', pathMatch : "full"},
  { path : '**', component : PagenotfoundComponent }
]

  
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopNavMenuComponent,
    HomeComponent,
    TitleComponent,
    LibrariansComponent,
    PagenotfoundComponent,
    CategoriesComponent,
    AuthorComponent,
    PublisherComponent,
    LanguagesComponent,
    BooksComponent,
    BorrowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule,
    DateInputsModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot(routerConfig),
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
