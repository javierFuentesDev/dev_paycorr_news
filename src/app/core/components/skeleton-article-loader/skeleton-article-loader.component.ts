import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-skeleton-article-loader',
  templateUrl: './skeleton-article-loader.component.html',
  styleUrls: ['./skeleton-article-loader.component.scss']
})
export class SkeletonArticleLoaderComponent {
  @Input() isTableView: boolean = false;
  skeletons = Array(10);
}
