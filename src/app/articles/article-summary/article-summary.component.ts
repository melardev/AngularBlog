import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../shared/models/article.model';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css']
})
export class ArticleSummaryComponent implements OnInit {

  @Input() article: Article;
  classes: string[] = ['badge badge-dark', 'badge badge-secondary', 'badge badge-light', 'badge badge-info'];

  constructor() {
  }

  ngOnInit() {
  }

}
