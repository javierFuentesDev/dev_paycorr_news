import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiNytimesInterceptor} from './core/interceptors/api-nytimes.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";
import {NYTimesImageUrlPipe} from "./shared/pipes/nytimes-image-url/nytimes-image-url.pipe";
import {ArticleCardComponent} from "./core/components/article-card/article-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NavbarComponent} from "./core/components/layout/nav-bar/navbar.component";
import {
  SkeletonArticleLoaderComponent
} from "./core/components/skeleton-article-loader/skeleton-article-loader.component";
import {BodyComponent} from "./core/components/layout/body/body.component";

@NgModule({
  declarations: [
    AppComponent,
    NYTimesImageUrlPipe,
    ArticleCardComponent,
    SkeletonArticleLoaderComponent,
    NavbarComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiNytimesInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
