import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {DataTablesModule} from 'angular-datatables'
import {HttpClientModule} from  '@angular/common/http';
import {RouterModule , Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { TopNavMenuComponent } from './component/top-nav-menu/top-nav-menu.component';
import { HomeComponent } from './component/home/home.component';
import { TitleComponent } from './component/title/title.component';
import { LibrariansComponent } from './component/librarians/librarians.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { AuthorsComponent } from './component/authors/authors.component';
import { PublisherComponent } from './component/publisher/publisher.component';
import { LanguagesComponent } from './component/languages/languages.component';

const routerConfig : Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'title', component : TitleComponent},
  {path: 'librarians', component : LibrariansComponent},
  {path: 'publishers', component : PublisherComponent},
  {path: 'authors', component : AuthorsComponent},
  {path: 'languages', component : LanguagesComponent},
  {path: 'categories', component : CategoriesComponent},
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
    AuthorsComponent,
    PublisherComponent,
    LanguagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot(routerConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
