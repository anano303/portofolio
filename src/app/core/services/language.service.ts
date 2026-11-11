import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type LanguageCode = 'ka' | 'en' | 'it';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly supportedLanguages: LanguageCode[] = ['ka', 'en', 'it'];
  private readonly storageKey = 'irma-language';
  private translations: Record<string, unknown> = {};
  private currentLanguageValue: LanguageCode = 'ka';

  constructor(private readonly http: HttpClient) {
    this.initializeLanguage();
  }

  get currentLanguage(): LanguageCode {
    return this.currentLanguageValue;
  }

  async initializeLanguage(): Promise<void> {
    const savedLanguage = this.getStoredLanguage();
    const languageToLoad = savedLanguage ?? 'ka';
    await this.loadLanguage(languageToLoad, false);
  }

  async switchLanguage(language: LanguageCode): Promise<void> {
    await this.loadLanguage(language, true);
  }

  translate(key: string): string {
    const value = this.resolvePath(this.translations, key);
    return typeof value === 'string' ? value : key;
  }

  private async loadLanguage(language: LanguageCode, persist: boolean): Promise<void> {
    const fileUrl = `assets/i18n/${language}.json`;
    const data = await firstValueFrom(this.http.get<Record<string, unknown>>(fileUrl));
    this.translations = data ?? {};
    this.currentLanguageValue = language;

    if (persist) {
      localStorage.setItem(this.storageKey, language);
    }

    document.documentElement.lang = language;
  }

  private getStoredLanguage(): LanguageCode | null {
    const value = localStorage.getItem(this.storageKey);
    return value && this.supportedLanguages.includes(value as LanguageCode)
      ? (value as LanguageCode)
      : null;
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
