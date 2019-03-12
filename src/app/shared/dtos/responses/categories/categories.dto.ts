import {Tag} from '../../../models/tag.model';
import {BaseAppDtoResponse} from '../shared/base.dto';
import {Category} from '../../../models/category.model';

export class CategoryDto extends Tag {
}

export class CategoryListDtoResponse extends BaseAppDtoResponse {
  categories: Category[];
}
