import {Tag} from '../../../models/tag.model';
import {Category} from '../../../models/category.model';
import {BaseAppDtoResponse} from '../shared/base.dto';
import {ArticlesDataDto} from '../../local/articles.dto';
import {Comment} from '../../../models/comment.model';

export class ArticleDto extends BaseAppDtoResponse {

  id: string;
  title: string;
  description: string;
  body: string;
  slug: string;
  created_at: string;

  categories?: Category[];
  tags?: Tag[];
  comments?: Comment[];
}


export class ArticleListResponseDto extends ArticlesDataDto {
}
