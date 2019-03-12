import {RouterModule, Routes} from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'by_tag/:slug',
    component: ArticleListComponent
  },
  {
    path: 'by_category/:slug',
    component: ArticleListComponent
  },
  {
    path: ':slug',
    component: ArticleDetailsComponent
  },
];

export const ArticlesRouter = RouterModule.forChild(routes);
