import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NytimesApiInterceptor} from './core/interceptors/nytimes-api.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: NytimesApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
