import { Pipe, PipeTransform } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly languageService: LanguageService) {}

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return this.languageService.translate(value);
  }
}
