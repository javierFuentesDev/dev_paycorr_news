import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() headline: string = '';
  @Input() multimedia: { url: string }[] = [];
  @Input() webUrl: string = '';
  @Input() wordCount: number = 0;
}
