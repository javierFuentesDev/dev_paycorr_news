import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-skeleton-article-loader',
  templateUrl: './skeleton-article-loader.component.html',
  styleUrls: ['./skeleton-article-loader.component.scss']
})
export class SkeletonArticleLoaderComponent {
  skeletons = Array(10);
}
