import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiServiceNyService} from "./core/services/api-service-ny/api-service-ny.service";
import {NotificationService} from "./core/services/notification-service/notification-service.service";
import {Article} from "./core/models/article/article";
import {LocalStorageService} from "./core/services/local-storage/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  articles$: Observable<Article[]> | undefined;
  totalResults: number = 0;
  currentPage: number = 0;
  query: string = 'Elon Musk';

  constructor(
    private apiServiceNyService: ApiServiceNyService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    const fetchParams = this.buildFetchParams();
    this.articles$ = this.apiServiceNyService.fetchArticles(fetchParams).pipe(
      map(response => {
        const articles = response.response.docs;
        this.totalResults = response.response.meta.hits;
        this.notificationService.success('Articles fetched successfully');
        this.localStorageService.saveArticles(articles);
        return articles;
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        this.notificationService.error('Failed to fetch articles. Loading from local storage');
        const storedArticles = this.localStorageService.getArticles();
        if (storedArticles.length > 0) {
          this.notificationService.success('Loaded articles from local storage');
        } else {
          this.notificationService.error('No articles available in local storage');
        }
        return of(storedArticles);
      })
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadArticles();
  }

  private buildFetchParams() {
    return {
      sort: 'newest',
      query: this.query,
      page: this.currentPage + 1,
      begin_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-13')
    };
  }
}
