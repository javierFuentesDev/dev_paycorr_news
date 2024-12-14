import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseNy} from "../../models/api-response-ny/api-response-ny";
import {FetchArticlesParams} from "../../models/fetch-articles-params/fetch-articles-params";
import {DateService} from "../../utils/date-service/date.service";
import {HttpParamsBuilderService} from "../http-params-builder/http-params-builder.service";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceNyService {
  private readonly apiUrl = `${environment.NY_TIMES_API_URL}/`;
  http = inject(HttpClient);
  dateService = inject(DateService);
  paramsBuilder = inject(HttpParamsBuilderService);

  fetchArticles(fetchParams: FetchArticlesParams): Observable<ApiResponseNy> {

    const formattedBeginDate = fetchParams.begin_date ? this.dateService.formatDate(fetchParams.begin_date) : null;
    const formattedEndDate = fetchParams.end_date ? this.dateService.formatDate(fetchParams.end_date) : null;

    const params = this.paramsBuilder
      .addIf(fetchParams.query, 'q', fetchParams.query)
      .add('page', fetchParams.page.toString())
      .addIf(formattedBeginDate, 'begin_date', formattedBeginDate)
      .addIf(formattedEndDate, 'end_date', formattedEndDate)
      .addIf(fetchParams.sort, 'sort', fetchParams.sort)
      .addIf(fetchParams.fl, 'fl', fetchParams.fl)
      .build();
    return this.http.get<ApiResponseNy>(this.apiUrl, {params});
  }
}
