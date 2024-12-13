import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseNy} from "../../interface/api-response-ny/api-response-ny";
import {FetchArticlesParams} from "../../interface/fetch-articles-params/fetch-articles-params";
import {DateService} from "../../utils/date-service/date.service";
import {HttpParamsBuilderService} from "../http-params-builder/http-params-builder.service";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceNyService {
  private readonly apiUrl = `${environment.NY_TIMES_API_URL}/`;
  http = inject(HttpClient);
  dateService = inject(DateService);
  paramsBuilder = inject(HttpParamsBuilderService);
  localStorageService = inject(LocalStorageService);

  fetchArticles(fetchParams: FetchArticlesParams): Observable<ApiResponseNy> {

    const formattedBeginDate = fetchParams.begin_date ? this.dateService.formatDate(fetchParams.begin_date) : null;
    const formattedEndDate = fetchParams.end_date ? this.dateService.formatDate(fetchParams.end_date) : null;

    const params = this.paramsBuilder
      .add('q', fetchParams.query)
      .add('page', fetchParams.page.toString())
      .addIf(formattedBeginDate, 'begin_date', formattedBeginDate)
      .addIf(formattedEndDate, 'end_date', formattedEndDate)
      .build();
    return this.http.get<ApiResponseNy>(this.apiUrl, {params});
  }
}
