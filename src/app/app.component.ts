import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiServiceNyService} from './core/services/api-service-ny/api-service-ny.service';
import {NotificationService} from './core/services/notification-service/notification-service.service';
import {LocalStorageService} from './core/services/local-storage/local-storage.service';
import {Article} from './core/models/article/article';
import {FetchArticlesParams} from './core/interface/fetch-articles-params/fetch-articles-params';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  articles$: Observable<Article[]> = of([]);
  query = 'Elon Musk';
  pagination = {
    currentPage: 0,
    totalPages: 1,
    pageSize: 10,
    totalResults: 0,
  };
  skeletons = Array(10);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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
    this.loading.next(true);
    this.articles$ = this.apiServiceNyService.fetchArticles(fetchParams).pipe(
      map((response) => {
        const articles = response.response.docs;
        this.pagination.totalResults = response.response.meta.hits;
        this.pagination.totalPages = Math.ceil(this.pagination.totalResults / this.pagination.pageSize);
        this.notificationService.success('Articles fetched successfully');
        this.localStorageService.saveArticles(articles);

        this.loading.next(false);
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
        this.pagination.totalPages = 1;
        return of(storedArticles);
      }),
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  changePage(direction: 'previous' | 'next'): void {
    if (direction === 'previous' && this.pagination.currentPage > 0) {
      this.pagination.currentPage--;
    } else if (direction === 'next' && this.pagination.currentPage < this.pagination.totalPages - 1) {
      this.pagination.currentPage++;
    }
    this.loadArticles();
  }

  private buildFetchParams(): FetchArticlesParams {
    return {
      sort: 'newest',
      query: this.query,
      page: this.pagination.currentPage + 1,
      begin_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-13'),
    };
  }

  trackById(index: number, item: Article): string {
    return item.id;
  }
}
