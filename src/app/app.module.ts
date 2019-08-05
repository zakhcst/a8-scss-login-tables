import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiDataService } from './api-data.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CurrentStatusComponent } from './pages/current-status/current-status.component';
import { NestedDataComponent } from './pages/nested-data/nested-data.component';
import { HeaderComponent } from './components/header/header.component';
import { AppErrorHandlerService } from './services/error-handler.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignInComponent,
    CurrentStatusComponent,
    NestedDataComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(ApiDataService)
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
