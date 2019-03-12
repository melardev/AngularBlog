import {User} from './user.model';

export class Comment {
  constructor(params: any = {}) {
    this.id = params.id;
    this.user = params.user;
    this.username = params.username;
    this.article_id = params.article_id;
    this.content = params.content;
    this.created_at = params.created_at;
  }

  id: number;
  user?: User;
  username: string;
  article_id?: number;
  content: string;
  created_at: string;
}
