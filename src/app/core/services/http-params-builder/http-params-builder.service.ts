import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpParamsBuilderService {

  private params = new HttpParams();

  add(key: string, value: string): this {
    if (value) {
      this.params = this.params.set(key, value);
    }
    return this;
  }

  addIf(condition: boolean | string | null | undefined, key: string, value: string | null): this {
    if (condition && value) {
      this.params = this.params.set(key, value);
    }
    return this;
  }

  build(): HttpParams {
    return this.params;
  }}
