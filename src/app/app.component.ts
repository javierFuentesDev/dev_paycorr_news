/*import {Component, OnInit} from '@angular/core';
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
  pagination = {
    currentPage: 0,
    totalPages: 1,
    pageSize: 10,
    totalResults: 0,
  };
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
        this.updatePagination(this.pagination.currentPage, Math.ceil(this.pagination.totalResults / this.pagination.pageSize), response.response.meta.hits);
        this.localStorageService.saveArticles(articles);
        this.loading.next(false);
        return articles;
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        this.notificationService.error('Failed to fetch articles. Loading from local storage');
        const storedArticles = this.localStorageService.getArticles();
        if (!storedArticles.length)
          this.notificationService.error('No articles available in local storage');

        this.updatePagination(null, 1, storedArticles.length);
        return of(storedArticles);
      }),
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updatePagination(currentPage: number | null, totalPages: number, totalResults: number): void {
    this.pagination.currentPage = currentPage || 0;
    this.pagination.totalPages = totalPages;
    this.pagination.totalResults = totalResults;
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
      page: this.pagination.currentPage + 1,
      begin_date: new Date(),
      end_date: new Date(),
      fl: 'headline,multimedia,web_url,word_count',
    };
  }

  trackById(index: number, item: Article): string {
    return item.id;
  }
}*/

import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {Article} from './core/models/article/article';
import {ArticleService} from "./core/services/article/article.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  articles$: Observable<Article[]>;
  loading$: Observable<boolean>;

  constructor(public articleService: ArticleService) {
    this.articles$ = this.articleService.articles$;
    this.loading$ = this.articleService.loading$;
  }

  ngOnInit(): void {
    this.articleService.loadArticles();
  }

  loadArticles(): void {
    this.articleService.loadArticles();
  }

  changePage(direction: 'previous' | 'next'): void {
    this.articleService.changePage(direction);
  }
}


