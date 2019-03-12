import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Tag} from '../models/tag.model';
import {TagListDtoResponse} from '../dtos/responses/tags/tags.dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urls.tags;
  }

  fetchAll(): Observable<Tag[]> {
    return this.httpClient.get<TagListDtoResponse>(this.baseUrl).pipe(map(res => {
      if (res.success) {
        return res.tags as Tag[];
      }
    }, catchError(err => {
      return [] as Tag[];
    })));
  }
}
