import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { AppState } from '../../Store/AppState';
import { authActions } from '../../Store/Auth/auth.actions';
import { selectCurrentUser } from '../../Store/Auth/auth.reducer';
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
  ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy, OnInit {
  currentSection: any;
  isNavbarContentOpen: any;
  userProfile: any;
  persistenceService: any;
  actionsSubscription: Subscription = new Subscription();
  currentUser$: Observable<CurrentUserInterface | null | undefined>;

  //<AppState/>
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actions$: Actions,
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  openNavbarContent(section: any) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
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
    });
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
  }
  // this.store.dispatch(authActions.logout())
  // of(this.currentUser$).subscribe((v) => console.log(v));

  // this.userService.logOut()

  navigateTo(path: any) {
    this.router.navigate([path]);
  }
}
// getUserProfile(){
//   return null;

// }

function getUserProfile() {
  throw new Error('Function not implemented.');
}
