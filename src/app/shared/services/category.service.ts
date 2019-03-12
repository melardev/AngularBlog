import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {TagListDtoResponse} from '../dtos/responses/tags/tags.dto';
import {catchError, map} from 'rxjs/operators';
import {CategoryListDtoResponse} from '../dtos/responses/categories/categories.dto';
import {Category} from '../models/category.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.categories;
  }

  fetchAll(): Observable<Category[]> {
    return this.httpClient.get<CategoryListDtoResponse>(this.baseUrl).pipe(map(res => {
      if (res.success) {
        return res.categories as Category[];
      }
    }, catchError(err => {
      return [] as Category[];
    })));
  }
}
