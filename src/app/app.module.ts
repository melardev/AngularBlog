import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {LocalStorageService} from './shared/services/local-storage.service';
import {ArticleService} from './shared/services/article.service';
import {CategoryService} from './shared/services/category.service';
import {NotificationService} from './shared/services/notification.service';
import {TagService} from './shared/services/tag.service';
import {UsersService} from './shared/services/users.service';
import {JwtHttpInterceptor} from './shared/interceptors/jwt-http.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [PageNotFoundComponent],
  providers: [LocalStorageService, ArticleService, CategoryService, NotificationService, TagService, UsersService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
