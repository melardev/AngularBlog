import {Injectable} from '@angular/core';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {BaseAppDtoResponse, ErrorAppDtoResponse} from '../dtos/responses/shared/base.dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorResult, SuccessResult} from '../dtos/local/base';
import {ArticleDto, ArticleListResponseDto} from '../dtos/responses/articles/articles.dto';
import {Article} from '../models/article.model';
import {PaginatedRequestDto} from '../dtos/requests/base.dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationService} from './notification.service';
import {buildErrorObservable} from '../utils/net.utils';
import {ArticlesDataDto} from '../dtos/local/articles.dto';
import {GetArticlesRequestDto} from '../dtos/requests/articles.dto';


let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: ArticlesDataDto;
  private readonly baseUrl: string;

  articlesBehaviourSubject = new BehaviorSubject<ArticlesDataDto>(this.articles);
  private lastUpdatedApiResponseForAll: number;
  private lastUpdatedApiResponseForEach: Object[];


  public defaultPagination: PaginatedRequestDto;
  private lastPaginatedRequest: GetArticlesRequestDto = {page: 0, pageSize: 0};

  public constructor(private httpClient: HttpClient,
                     private notificationService: NotificationService) {
    if (CREATED) {
      alert('Two instances of the same ProductsService');
      return;
    }

    CREATED = true;
    this.defaultPagination = {
      page: 1,
      pageSize: 6
    };
    this.baseUrl = environment.urls.articles;

  }

  private httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  // fetchPage(query: PaginatedRequestDto = this.defaultPagination):
  fetchPage(query: GetArticlesRequestDto = {page: 1, pageSize: 5}):
    Observable<ArticlesDataDto | ErrorResult> {

    query.page = query.page || 1;
    query.pageSize = query.pageSize || 5;

    this.httpClient.get<ArticleListResponseDto | ErrorAppDtoResponse>
    (`${this.getUrlForFetchPage(query)}?page=${query.page}&page_size=${query.pageSize}`)
      .pipe(
        retry(2),
        tap((response: any) => {
          console.log('canceled:false');
          const isCanceled = false;
        })).subscribe(
      res => {
        this.lastPaginatedRequest = query;
        console.log('success:' + res.success);
        if (res.success && res.articles) {
          this.articles = (res as ArticlesDataDto);
          this.lastUpdatedApiResponseForAll = new Date().getTime();
          this.notifyDataChanged();
        }
        return res as ArticlesDataDto;
      }, err => {
        this.notificationService.dispatchErrorMessage(err);
        return buildErrorObservable(err);
      });

    // always return the behaviourSubject, this guy will notify the observers for any update
    return this.articlesBehaviourSubject.asObservable();
  }

  getById(id: string): Observable<ArticleDto> {
    return this.httpClient.get<ArticleDto>(`${this.baseUrl}/by_id/${id}`);
  }

  fetchBySlug(slug: string): Observable<ArticleDto | ErrorResult> {
    return this.httpClient.get<ArticleDto>(`${this.baseUrl}/${slug}`).pipe(
      map(res => {
        this.notificationService.dispatchSuccessMessage('Retrieved product details');
        const article = res as ArticleDto;
        const responseSlug = res.slug;
        const id = res.id;
        return article;
      }),
      catchError(err => {
        this.notificationService.dispatchErrorMessage(err.message);
        return buildErrorObservable(err);
      })
    );
  }

  createTodo(article: Article): Observable<ArticleDto> {
    return this.httpClient.post<ArticleDto>(this.baseUrl, article, this.httpOptions);
  }

  update(article: Article): Observable<ArticleDto | any> {
    return this.httpClient.put<ArticleDto>(this.baseUrl, article, this.httpOptions)
      .pipe(retry(5), map(res => {
        if (res.success) {
          const at = this.articles.articles.find(t => t.id === res.id);
          // Update the articles-api array
          this.articles.articles = this.articles.articles.map(t => t.id === article.id ? article : t);
        }
        return res; // || {};
      }), catchError(err => {
        return err;
      }));
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseUrl).pipe(
      map(res => {
        return res;
        // this.articles-api = [];
        // return this.articlesBehaviourSubject;
      }), catchError(err => {
        return err;
      }));
  }

  deleteById(id: number) {
    return this.httpClient.delete<ArticleDto>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  private notifyDataChanged() {
    this.articlesBehaviourSubject.next(this.articles);
  }

  submitComment(comment: Comment, slug: string): Observable<BaseAppDtoResponse> {
    return this.httpClient.post<BaseAppDtoResponse>(`${environment.urls.articles}/${slug}/comments`, comment).pipe(
      map(res => {
        this.notificationService.dispatchSuccessMessage('Comment submitted');
        return res;
      }), catchError(err => {
        console.log(err);
        this.notificationService.dispatchErrorMessage(err);
        return [];
      }));
  }

  deleteComment(id: number): Observable<SuccessResult | ErrorResult> {
    if (id == null) {
      this.notificationService.dispatchErrorMessage('Invalid comment id provided to delete');
      return buildErrorObservable('Invalid comment id provided to delete');
    }
    return this.httpClient.delete<BaseAppDtoResponse>(`${environment.urls.comments}/${id}`).pipe(
      map(res => {
        this.notificationService.dispatchSuccessMessage('Comment deleted');
        return res;
      }, catchError(err => {
        this.notificationService.dispatchErrorMessage(err);
        return buildErrorObservable(err);
      }))
    );
  }

  private getUrlForFetchPage(query: { tag?; category? }) {
    if (query.tag) {
      return `${this.baseUrl}/by_tag/${query.tag}`;
    } else if (query.category) {
      return `${this.baseUrl}/by_category/${query.category}`;
    } else {
      return this.baseUrl;
    }
  }
}
