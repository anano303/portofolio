import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';
import { LanguageService } from './core/services/language.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        {
          provide: LanguageService,
          useValue: {
            currentLanguage: 'ka',
            translate: (key: string) =>
              key === 'hero.title' ? 'გამარჯობა, მე ვარ ირმა ენდელაძე' : key
          }
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ირმა ენდელაძე');
  });

  it('redirects /home and unknown paths to the portfolio', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    for (const url of ['/home', '/does-not-exist']) {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      expect(router.url).toBe('/');
      expect(fixture.nativeElement.querySelector('h1')).toBeTruthy();
    }
  });

  it('navigates to section fragments from the header and hero', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLAnchorElement>('a[href="/#about"]')!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/#about');
    page.querySelector<HTMLAnchorElement>('.hero-actions a')!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/#projects');
  });
});
