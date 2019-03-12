import {PageMeta} from '../responses/shared/page-meta.dto';

export class BaseAppResult {
  success: boolean;
  full_messages: string[];
}

export class ErrorResult extends BaseAppResult {
  success = false;
}

export class SuccessResult extends BaseAppResult {
  success = true;
}

export class PagedResult extends SuccessResult {
  page_meta: PageMeta;
}
