import {BaseAppDtoResponse} from '../shared/base.dto';
import {User} from '../../../models/user.model';


export class CommentSubmittedResponse extends BaseAppDtoResponse {
  id: number;
  username: string;
  created_at: string;
  content: string;
  user?: User;
}
