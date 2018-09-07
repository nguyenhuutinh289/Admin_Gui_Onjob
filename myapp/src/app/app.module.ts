import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTablesModule} from 'angular-datatables'

import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { TopNavMenuComponent } from './component/top-nav-menu/top-nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopNavMenuComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
