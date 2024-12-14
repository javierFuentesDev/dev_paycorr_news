import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';

@Pipe({
  name: 'nyTimesImageUrl'
})
export class NYTimesImageUrlPipe implements PipeTransform {

  private readonly baseUrl = 'https://www.' + environment.NY_TIMES_DOMAIN;
  private readonly defaultImageUrl = 'https://via.placeholder.com/300x200?text=Image+Not+Found';

  private sanitizer = inject(DomSanitizer);

  transform(imageUrl: string | null): SafeUrl {
    if (!imageUrl) {
      return this.defaultImageUrl;
    }
    const fullUrl = this.baseUrl + imageUrl;
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
