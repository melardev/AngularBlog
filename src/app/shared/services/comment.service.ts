import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Category} from '../models/category.model';
import {environment} from '../../../environments/environment';
import {ErrorResult} from '../dtos/local/base';
import {ErrorAppDtoResponse} from '../dtos/responses/shared/base.dto';
import {CommentSubmittedResponse} from '../dtos/responses/comments/comment-submitted.response';
import {Comment} from '../models/comment.model';
import {buildErrorObservable} from '../utils/net.utils';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.articles;
  }

  create(slug: string, content: string): Observable<Comment | ErrorResult> {
    return this.httpClient.post<CommentSubmittedResponse | ErrorAppDtoResponse>
    (`${this.baseUrl}/${slug}/comments`,
      {content}).pipe(map(res => {
      if (res.success) {
        return new Comment(res);
      }
    }, catchError(err => {
      return buildErrorObservable(err.message);
    })));
  }
}
