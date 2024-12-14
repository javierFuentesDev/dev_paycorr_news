import {Component, Output, EventEmitter, Input, HostListener} from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    isScrolled: boolean = false;
    logoPath: string = 'assets/images/logo-new-york-times.png';
    @Input() currentPage: number = 0;
    @Input() totalPages: number = 0;
    @Output() refreshClicked = new EventEmitter<void>();
    @Output() previousPageClicked = new EventEmitter<void>();
    @Output() nextPageClicked = new EventEmitter<void>();

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        this.isScrolled = scrollTop > 50;
    }


    onRefreshClick(): void {
        this.refreshClicked.emit();
    }

    onPreviousPage(): void {
        if (this.currentPage > 0) {
            this.previousPageClicked.emit();
        }
    }

    onNextPage(): void {
        if (this.currentPage < this.totalPages - 1) {
            this.nextPageClicked.emit();
        }
    }
}
