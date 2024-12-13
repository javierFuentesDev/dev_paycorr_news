import {Component, inject, OnInit} from '@angular/core';
import {Article} from "./core/models/article/article";
import {ApiServiceNyService} from "./core/services/api-service-ny/api-service-ny.service";
import {ApiResponseNy} from "./core/interface/api-response-ny/api-response-ny";
import {FetchArticlesParams} from "./core/interface/fetch-articles-params/fetch-articles-params";
import {NotificationService} from "./core/services/notification-service/notification-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  articles: Article[] = [];
  totalResults: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  query: string = 'Elon Musk';

  apiServiceNyService = inject(ApiServiceNyService);
  notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {

    let fetchParams: FetchArticlesParams = {
      sort: 'newest',
      query: this.query,
      page: this.currentPage + 1,
      begin_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-13')
    }

    this.apiServiceNyService.fetchArticles(fetchParams).subscribe({
      next: (response: ApiResponseNy) => {
        this.articles = response.response.docs;
        this.totalResults = response.response.meta.hits;
        this.notificationService.success('Articles fetched successfully');
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      }
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchArticles();
  }
}
