import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

const routerConfig : Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'title', component : TitleComponent},
  {path: 'librarians', component : LibrariansComponent},
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
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    RouterModule.forRoot(routerConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
