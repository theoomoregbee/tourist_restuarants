import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ClarityModule } from "clarity-angular";

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ResultComponent } from './result/result.component';
 


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
