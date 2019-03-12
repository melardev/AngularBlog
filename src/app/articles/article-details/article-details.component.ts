import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../shared/models/article.model';
import {ArticleService} from '../../shared/services/article.service';
import {ActivatedRoute} from '@angular/router';
import {ArticleDto} from '../../shared/dtos/responses/articles/articles.dto';
import {UsersService} from '../../shared/services/users.service';
import {CommentService} from '../../shared/services/comment.service';
import {Comment} from '../../shared/models/comment.model';
import {NotificationService} from '../../shared/services/notification.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  @ViewChild('textAreaCommentData') textArea: ElementRef;
  private article: ArticleDto;
  private image: { url: string } = {url: ''};
  private commentData: string;
  private isAuthenticated: boolean;

  constructor(private articleService: ArticleService,
              private usersService: UsersService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.articleService.fetchBySlug(slug).subscribe(res => {
      if (res.success) {
        this.article = res as ArticleDto;
      }
    }, err => {
      debugger;
    });

    this.usersService.getUser().subscribe(user => {
      this.isAuthenticated = !!(user && user.username);
    });
  }

  postComment() {
    const content = this.textArea.nativeElement.value;
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.commentService.create(slug, content).subscribe(res => {
      if ((res as Comment).id) {
        this.article.comments.push(res as Comment);
        this.notificationService.dispatchSuccessMessage('Comment created successfully');
        this.textArea.nativeElement.value = '';
      }
    }, err => {
      debugger;
    });
  }
}
