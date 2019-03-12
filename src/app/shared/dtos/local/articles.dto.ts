import {Article} from '../../models/article.model';
import {PagedResult} from './base';

export class ArticlesDataDto extends PagedResult {
  articles: Article[];
}
