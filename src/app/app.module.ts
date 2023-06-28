import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { ChangeViewComponent } from './components/change-view/change-view.component';
import { BlogContentComponent } from './components/blog-content/blog-content.component';
import { BlogContentRightComponent } from './components/blog-content-right/blog-content-right.component';
import { BlogContentLeftComponent } from './components/blog-content-left/blog-content-left.component';
import { TruncatePipe } from '../app/pipes/text.pipe';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ChangeViewComponent,
    BlogContentComponent,
    BlogContentRightComponent,
    BlogContentLeftComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  //bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { };
  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define("search-portlet-neoris", appElement);
  }
}

