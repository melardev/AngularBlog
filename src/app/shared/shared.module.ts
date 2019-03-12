import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    // Built-in modules

    // My modules
    HeaderComponent,
    FooterComponent,
    PaginationComponent
    // 3party
  ]
})
export class SharedModule {
}
