import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleSummaryComponent} from './article-summary/article-summary.component';
import {TagOrCategoryCardComponent} from './tag-or-category-card/tag-or-category-card.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';
import {RouterModule} from '@angular/router';
import {ArticlesRouter} from './articles.routing';

@NgModule({
  declarations: [
    ArticleListComponent, ArticleSummaryComponent, TagOrCategoryCardComponent, ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ArticlesRouter
  ]
})
export class ArticlesModule {
}
