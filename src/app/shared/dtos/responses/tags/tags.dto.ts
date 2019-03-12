import {Tag} from '../../../models/tag.model';
import {BaseAppDtoResponse} from '../shared/base.dto';

export class TagDto extends Tag {
}

export class TagListDtoResponse extends BaseAppDtoResponse {
  tags: Tag[];
}
