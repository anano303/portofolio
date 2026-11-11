import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly navItems = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#about', labelKey: 'nav.about' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#skills', labelKey: 'nav.skills' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#contact', labelKey: 'nav.contact' }
  ];

  readonly socialLinks = [
    { href: 'mailto:irma.zarf.endeladze@gmail.com', labelKey: 'contact.emailLabel' },
    { href: 'https://github.com/irmazarfendeladze-cmyk', labelKey: 'contact.githubLabel' },
    { href: 'https://wa.me/393889817989', labelKey: 'contact.whatsappLabel' }
  ];

  constructor(readonly languageService: LanguageService) {}

  getCopyrightText(): string {
    return this.languageService.translate('footer.copyright').replace('{year}', String(this.year));
  }
}
