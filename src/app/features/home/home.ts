import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FooterComponent } from '../../components/footer/footer';
import { ProjectCardComponent, ProjectCardItem } from '../../components/project-card/project-card';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export type ProjectFilter = 'all' | 'web' | 'ui' | 'ecommerce';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, ProjectCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  readonly profileImage = 'assets/images/photo.png';

  readonly projectFilters: Array<{ value: ProjectFilter; labelKey: string }> = [
    { value: 'all', labelKey: 'projects.filters.all' },
    { value: 'web', labelKey: 'projects.filters.web' },
    { value: 'ui', labelKey: 'projects.filters.ui' },
    { value: 'ecommerce', labelKey: 'projects.filters.ecommerce' }
  ];

  readonly stats = [
    { value: '2+', labelKey: 'stats.years' },
    { value: '10+', labelKey: 'stats.projects' }
  ];

  readonly skills = [
    'HTML',
    'CSS',
    'SCSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'Bootstrap',
    'Responsive Design',
    'Figma',
    'Git',
    'GitHub'
  ];

  readonly services = [
    {
      titleKey: 'services.frontend.title',
      descriptionKey: 'services.frontend.description'
    },
    {
      titleKey: 'services.responsive.title',
      descriptionKey: 'services.responsive.description'
    }
  ];

  readonly aboutItems = [
    'about.items.0',
    'about.items.1',
    'about.items.2',
    'about.items.3',
    'about.items.4'
  ];

  readonly projects: ProjectCardItem[] = [
    {
      id: 'marmenio',
      category: 'web',
      href: 'https://irmazarfendeladze-cmyk.github.io/-3/',
      titleKey: 'projects.marmenio.title',
      descriptionKey: 'projects.marmenio.description',
      previewClass: 'restaurant',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'figma',
      category: 'ui',
      href: 'https://irmazarfendeladze-cmyk.github.io/FIGMA/',
      titleKey: 'projects.figma.title',
      descriptionKey: 'projects.figma.description',
      previewClass: 'placeholder',
      tech: ['Figma', 'UI/UX', 'Branding']
    },
    {
      id: 'marmenio2',
      category: 'ui',
      href: 'https://irmazarfendeladze-cmyk.github.io/Figma-Marmerino-2-/',
      titleKey: 'projects.marmenio2.title',
      descriptionKey: 'projects.marmenio2.description',
      previewClass: 'luxury',
      tech: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      id: 'shop',
      category: 'ecommerce',
      href: 'https://onlineshop-ashy.vercel.app/',
      titleKey: 'projects.shop.title',
      descriptionKey: 'projects.shop.description',
      previewClass: 'shop',
      tech: ['Angular', 'TypeScript', 'SCSS']
    }
  ];

  activeFilter = signal<ProjectFilter>('all');

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  formFeedback = '';

  constructor(readonly languageService: LanguageService) {}

  get filteredProjects(): ProjectCardItem[] {
    return this.activeFilter() === 'all'
      ? this.projects
      : this.projects.filter((project) => project.category === this.activeFilter());
  }

  setFilter(filter: ProjectFilter): void {
    this.activeFilter.set(filter);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.formFeedback = this.languageService.translate('contact.form.required');
      return;
    }

    const payload = this.contactForm.getRawValue();
    console.info('Portfolio contact form payload', payload);
    this.formFeedback = this.languageService.translate('contact.form.success');
    this.contactForm.reset();
  }
}
