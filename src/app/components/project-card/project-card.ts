import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface ProjectCardItem {
  id: string;
  category: 'web' | 'ui' | 'ecommerce';
  href?: string;
  titleKey: string;
  descriptionKey: string;
  previewClass: 'restaurant' | 'luxury' | 'shop' | 'placeholder';
  tech: string[];
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectCardItem;

  constructor(readonly languageService: LanguageService) {}

  getCategoryLabel(): string {
    return this.languageService.translate(`projects.filters.${this.project.category}`);
  }
}
