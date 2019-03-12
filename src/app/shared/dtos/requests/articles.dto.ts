import {PaginatedRequestDto} from './base.dto';

export class GetArticlesRequestDto extends PaginatedRequestDto {
  page: number;
  pageSize: number;
  tag?: string;
  category?: string;
}
