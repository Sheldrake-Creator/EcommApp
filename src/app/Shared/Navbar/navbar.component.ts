import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './nav-content/nav-content.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../State/Auth/auth.component'
// import { AdminComponent } from '../../admin/components/admin.component';
// import { UserService } from '../State/User/user.services';
// import { getUserProfile } from '../State/User/user.action';
import { Store } from '@ngrx/store';
import { AppState } from "../State/AppState";

import { Actions, ofType } from '@ngrx/effects';
// import { PersistenceService } from '../State/Auth/auth.persistence.service';
import { merge, Observable, of, Subscription } from 'rxjs';
import { authActions, logout } from '../State/Auth/Store/auth.actions';
import { selectCurrentUser } from '../State/Auth/Store/auth.reducer';
import { CurrentUserInterface } from '../State/Auth/Types/currentUser.interface';
// import { error } from 'console';,


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, NavContentComponent, CommonModule],

templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy, OnInit {

  currentSection: any;
  isNavbarContentOpen: any;
  userProfile: any;
  persistenceService:any;
  actionsSubscription: Subscription = new Subscription;
  currentUser$: Observable<CurrentUserInterface | null | undefined>;


  //<AppState/>
  constructor(private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actions$: Actions) {
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
  ).subscribe(() =>{
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
    const modalContainer = document.querySelector(".modal-container");
    const openButtons = document.querySelectorAll(".open-button");

    let clickInsideButton = false

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }
    })
    if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }

  handleOpenLogin = () => {
    console.log("logging in...");

    this.dialog.open(AuthComponent, {
      width: "500px",
      disableClose: false
    })
  }

  handleLogOut() {
    this.store.dispatch(logout());
  }
    // this.store.dispatch(authActions.logout())
    // of(this.currentUser$).subscribe((v) => console.log(v));
    

    // this.userService.logOut()



  navigateTo(path: any){
    this.router.navigate([path]);
  }
}
    // this.persistenceService = inject(PersistenceService)
    
    // if (this.persistenceService.get('key')){
    //   console.log("accessToken: ",this.persistenceService.get('key'));
      
    // }
      // this.userService.getUserProfile();

    // this.store.pipe(select((store) => store.user)).subscribe((user) => {
    //   this.userProfile = user.userProfile;
    //   if (user.userProfile) {
    //     this.dialog.closeAll();
    //   }
    //   console.log("user ", user);
    // });
// }
