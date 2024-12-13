import {Injectable} from '@angular/core';
import {Article} from "../../models/article/article";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly storageKey = environment.LOCAL_STORAGE_KEY;

  saveArticles(articles: Article[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(articles));
    } catch (error) {
      console.error('Error saving articles to localStorage:', error);
    }
  }

  getArticles(): Article[] {
    try {
      const storedArticles = localStorage.getItem(this.storageKey);
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      console.error('Error retrieving articles from localStorage:', error);
      return [];
    }
  }

  clearArticles(): void {
    localStorage.removeItem(this.storageKey);
  }
}
