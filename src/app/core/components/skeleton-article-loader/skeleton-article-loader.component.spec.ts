import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonArticleLoaderComponent } from './skeleton-article-loader.component';

describe('SkeletonArticleLoaderComponent', () => {
  let component: SkeletonArticleLoaderComponent;
  let fixture: ComponentFixture<SkeletonArticleLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonArticleLoaderComponent]
    });
    fixture = TestBed.createComponent(SkeletonArticleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
