import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseNy} from "../../interface/api-response-ny/api-response-ny";
import {FetchArticlesParams} from "../../interface/fetch-articles-params/fetch-articles-params";
import {DateService} from "../../utils/date-service/date.service";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceNyService {
  private readonly apiUrl = `${environment.NY_TIMES_API_URL}/`;
  http = inject(HttpClient);
  dateService = inject(DateService);

  fetchArticles(fetchParams: FetchArticlesParams): Observable<ApiResponseNy> {
    const params = this.buildHttpParams(fetchParams);
    return this.http.get<ApiResponseNy>(this.apiUrl, {params});
  }

  private buildHttpParams(fetchParams: FetchArticlesParams): HttpParams {
    let params = new HttpParams()
      .set('q', fetchParams.query)
      .set('page', fetchParams.page.toString())
      .set('api-key', environment.NY_TIMES_API_KEY);

    if (fetchParams.begin_date) {
      params = params.set('begin_date', this.dateService.formatDate(fetchParams.begin_date));
    }
    if (fetchParams.end_date) {
      params = params.set('end_date', this.dateService.formatDate(fetchParams.end_date));
    }

    return params;
  }


}
