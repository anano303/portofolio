import { Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import ka from '../../../assets/i18n/ka.json';
import en from '../../../assets/i18n/en.json';
import it from '../../../assets/i18n/it.json';

export type LanguageCode = 'ka' | 'en' | 'it';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly supportedLanguages: LanguageCode[] = ['ka', 'en', 'it'];
  private readonly storageKey = 'irma-language';
  private readonly dictionaries: Record<LanguageCode, Record<string, unknown>> = { ka, en, it };
  private readonly translations = signal<Record<string, unknown>>(ka);
  private readonly currentLanguageValue = signal<LanguageCode>('ka');

  constructor(
    private readonly title: Title,
    private readonly meta: Meta
  ) {
    this.initializeLanguage();
  }

  get currentLanguage(): LanguageCode {
    return this.currentLanguageValue();
  }

  initializeLanguage(): void {
    const savedLanguage = this.getStoredLanguage();
    const languageToLoad = savedLanguage ?? 'ka';
    this.loadLanguage(languageToLoad, false);
  }

  switchLanguage(language: LanguageCode): void {
    this.loadLanguage(language, true);
  }

  translate(key: string): string {
    const value = this.resolvePath(this.translations(), key);
    return typeof value === 'string' ? value : key;
  }

  private loadLanguage(language: LanguageCode, persist: boolean): void {
    this.translations.set(this.dictionaries[language]);
    this.currentLanguageValue.set(language);

    if (persist) {
      try {
        localStorage.setItem(this.storageKey, language);
      } catch {
        // Language switching still works when the browser blocks storage.
      }
    }

    document.documentElement.lang = language;
    this.title.setTitle(`${this.translate('footer.title')} | ${this.translate('footer.role')}`);
    this.meta.updateTag({ name: 'description', content: this.translate('hero.description') });
  }

  private getStoredLanguage(): LanguageCode | null {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value && this.supportedLanguages.includes(value as LanguageCode)
        ? (value as LanguageCode)
        : null;
    } catch {
      return null;
    }
  }

  private resolvePath(source: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }

      return undefined;
    }, source);
  }
}
