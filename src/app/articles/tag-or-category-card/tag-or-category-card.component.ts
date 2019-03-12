import {Component, Input} from '@angular/core';
import {Tag} from '../../shared/models/tag.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-tag-or-category-card',
  templateUrl: './tag-or-category-card.component.html',
  styleUrls: ['./tag-or-category-card.component.css']
})
export class TagOrCategoryCardComponent {

  @Input() itemType: string;

  @Input() tags: Tag[];
  @Input() categories: Category[];

  constructor() {
  }

  prefixUrl(): string {
    if (this.itemType === 'tag') {
      return 'by_tag';
    } else {
      return 'by_category';
    }
  }
}
