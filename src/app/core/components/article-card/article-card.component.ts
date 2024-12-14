import { Component, Input } from '@angular/core';
import {Multimedia} from "../../models/multimedia/multimedia";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() headline: string = '';
  @Input() multimedia: Multimedia[] = [];
  @Input() webUrl: string = '';
  @Input() wordCount: number = 0;
}
