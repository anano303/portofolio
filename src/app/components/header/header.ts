import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LanguageCode, LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  readonly navigation = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#about', labelKey: 'nav.about' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#skills', labelKey: 'nav.skills' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#contact', labelKey: 'nav.contact' }
  ];

  readonly languageOptions: Array<{ code: LanguageCode; label: string }> = [
    { code: 'ka', label: 'KA' },
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' }
  ];

  isMenuOpen = false;

  constructor(readonly languageService: LanguageService) {}

  async changeLanguage(language: LanguageCode): Promise<void> {
    await this.languageService.switchLanguage(language);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
