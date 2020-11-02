import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  // tslint:disable-next-line:typedef
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
