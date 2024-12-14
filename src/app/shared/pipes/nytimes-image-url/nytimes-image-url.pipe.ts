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

  transform(multimedia: { url: string }[] | null | undefined): SafeUrl {
    if (!multimedia || multimedia.length === 0 || !multimedia[0]?.url) {
      return this.defaultImageUrl;
    }
    const fullUrl = this.baseUrl + multimedia[0].url;
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
