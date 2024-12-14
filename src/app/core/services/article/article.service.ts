import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {Article} from "../../models/article/article";
import {ApiServiceNyService} from "../api-service-ny/api-service-ny.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {FetchArticlesParams} from "../../models/fetch-articles-params/fetch-articles-params";
import {NotificationService} from "../notification-service/notification-service.service";
import {LoadingService} from "../loading-service/loading-service.service";


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  pagination = {
    currentPage: 0,
    totalPages: 1,
    pageSize: 10,
    totalResults: 0,
  };

  constructor(
    private apiServiceNyService: ApiServiceNyService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
  ) {
  }

  loadArticles(): void {
    const fetchParams = this.buildFetchParams();
    this.loading$.next(true);
    this.loadingService.show('Fetching data...');

    this.apiServiceNyService.fetchArticles(fetchParams).pipe(
      map((response) => {
        const articles = response.response.docs;
        this.updatePagination(
          this.pagination.currentPage,
          Math.ceil(response.response.meta.hits / this.pagination.pageSize),
          response.response.meta.hits
        );
        this.localStorageService.saveArticles(articles);
        this.articles$.next(articles);
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        const storedArticles = this.localStorageService.getArticles();
        if (!storedArticles.length)
          this.notificationService.error('No articles available in local storage');
        this.updatePagination(null, 1, storedArticles.length);
        this.articles$.next(storedArticles);
        return of([]);
      }),
      finalize(() => {
        this.loading$.next(false);
        this.loadingService.hide();
      })
    ).subscribe();
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

  private updatePagination(
    currentPage: number | null,
    totalPages: number,
    totalResults: number
  ): void {
    this.pagination.currentPage = currentPage ?? 0;
    this.pagination.totalPages = totalPages;
    this.pagination.totalResults = totalResults;
  }
}
