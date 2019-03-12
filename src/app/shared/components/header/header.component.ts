import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {NotificationService} from '../../services/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isAuthenticated = false;
  private canCreateArticles = false;
  private subscriptions: Subscription[];
  private className: string;
  private message: string;


  constructor(private usersService: UsersService, private notificationService: NotificationService) {
    this.subscriptions = [];
    this.subscriptions.push(this.usersService.getUser().subscribe(user => {
      this.isAuthenticated = user && user.username != null;
      this.canCreateArticles = user && (user.isAdmin() || user.isAuthor());
    }));

    this.notificationService.getNotifications().subscribe(notification => {
      if (notification == null) {
        return;
      }
      this.className = notification.type === 'success' ? 'alert alert-success' : 'alert alert-danger';
      this.message = notification.message;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.usersService.logout();
  }
}
