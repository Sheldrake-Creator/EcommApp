import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter, merge } from 'rxjs';
import { AppState } from '../../Store/AppState';
import { authActions } from '../../Store/Auth/auth.actions';
import { selectCurrentUser } from '../../Store/Auth/auth.reducer';
import { cartActions } from '../../Store/Cart/cart.actions';
import { selectCartItemCount } from '../../Store/Cart/cart.reducer';
import { productActions } from '../../Store/Product/product.action';
import { SectionInterface } from '../../models/NavContent/navContent.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';
import { AuthComponent } from '../authentication/auth/auth.component';
import { NavContentComponent } from './nav-content/nav-content.component';
// import { error } from 'console';,

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NavContentComponent,
    CommonModule,
    MatBadgeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy, OnInit {
  isMobileMenuOpen = false;
  currentSection: any;
  isNavbarContentOpen: any;
  userProfile: any;
  persistenceService: any;
  actionsSubscription: Subscription = new Subscription();
  currentUser$: Observable<CurrentUserInterface | null | undefined>;
  itemCount$: Observable<number | undefined>;
  routerSubscription: Subscription | undefined;

  //<AppState/>
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actions$: Actions,
  ) {
    this.itemCount$ = this.store.select(selectCartItemCount);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  openNavbarContent(section: any) {
    if (this.isNavbarContentOpen && this.currentSection === section) {
      this.closeNavbarContent();
    } else {
      this.isNavbarContentOpen = true;
      this.currentSection = section;
    }
  }
  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }

  ngOnInit() {
    this.actionsSubscription = merge(
      this.actions$.pipe(ofType(authActions.loginSuccess)),
      this.actions$.pipe(ofType(authActions.registerSuccess)),
    ).subscribe(() => {
      this.dialog.closeAll();
      this.store.dispatch(cartActions.getCartRequest());
    });

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current URL is the one where you need to reset itemCount$
        if (event.urlAfterRedirects === '/payment-success') {
          // Adjust the URL as necessary
          this.store.dispatch(cartActions.getCartRequest());
        }
      });
    //! this.store.dispatch();
  }

  ngOnDestroy() {
    if (this.actionsSubscription) {
      this.actionsSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', [`$event`])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-button');

    let clickInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }
    });
    if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }

  handleOpenLogin = () => {
    console.log('logging in...');

    this.dialog.open(AuthComponent, {
      width: '500px',
      disableClose: false,
    });
  };

  handleLogOut() {
    this.store.dispatch(authActions.logout());
    this.router.navigate(['/']);
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

  navigateToProducts() {
    this.router.navigate(['/products'], { queryParams: { showAll: true } });
  }

  loadNavContentHandler() {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('isMobileMenuOpen:', this.isMobileMenuOpen);
  }
}
