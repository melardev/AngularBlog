import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../shared/services/article.service';
import {ArticlesDataDto} from '../../shared/dtos/local/articles.dto';
import {PaginatedRequestDto} from '../../shared/dtos/requests/base.dto';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorResult} from '../../shared/dtos/local/base';
import {TagService} from '../../shared/services/tag.service';
import {CategoryService} from '../../shared/services/category.service';
import {Tag} from '../../shared/models/tag.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  private articlesData: ArticlesDataDto;
  private fetchAllSubscription;
  private title: string;
  private tags: Observable<Tag[]>;
  private categories: Observable<Category[]>;


  constructor(private articleService: ArticleService, private tagService: TagService,
              private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.tags = this.tagService.fetchAll();
    this.categories = this.categoryService.fetchAll();

    if (!this.activatedRoute.snapshot.paramMap.get('slug')) {
      this.title = 'All articles';
      const observable = this.articleService.fetchPage();
      if (this.fetchAllSubscription == null) {
        this.fetchAllSubscription = observable.subscribe(res => {
          if (res && res.success) {
            this.articlesData = res as ArticlesDataDto;
          }
        });
      }
    }

    // I could also use this.activatedRoute.url.subscribe
    this.activatedRoute.paramMap.subscribe(map => {

      if (map.has('slug')) {
        let observable: Observable<ArticlesDataDto | ErrorResult>;
        const slug = map.get('slug');
        this.title = slug + ' Articles';
        const url = this.activatedRoute.snapshot.routeConfig.path;
        if (url.startsWith('by_category')) {
          observable = this.articleService.fetchPage({category: slug, page: 1, pageSize: 5});
        } else if (url.startsWith('by_tag')) {
          observable = this.articleService.fetchPage({tag: slug, page: 1, pageSize: 5});
        }

        if (observable && this.fetchAllSubscription == null) {
          this.fetchAllSubscription = observable.subscribe(res => {
            if (res && res.success) {
              this.articlesData = res as ArticlesDataDto;
            }
          });
        }
      }
    });
  }

  onLoadMore(query: PaginatedRequestDto) {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    const url = this.activatedRoute.snapshot.routeConfig.path;
    if (url.startsWith('by_category')) {
      // no need to subscribe, we render using observables so angular takes care for us
      this.articleService.fetchPage({category: slug, ...query});
    } else if (url.startsWith('by_tag')) {
      // no need to subscribe, we render using observables so angular takes care for us
      this.articleService.fetchPage({tag: slug, ...query});
    } else {
      this.articleService.fetchPage(query);
    }

  }


}
