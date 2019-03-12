import {Category} from './category.model';
import {Tag} from './tag.model';
import {Comment} from './comment.model';
import {User} from './user.model';

export class Article {
  constructor(params: any = {}) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.body = params.body;
    this.tags = params.tags;
    this.categories = params.categories;
    this.comments = params.comments;
  }

  id: string;
  title: string;
  description: string;
  body: string;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  tags?: Tag[];
  comments?: Comment[];
  user: User;
  comments_count: number;
}
