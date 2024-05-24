import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore, } from '@ngrx/store';
import { authFeatureKey, authReducer } from './Shared/State/Auth/Store/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as authEffects from "./Shared/State/Auth/Store/auth.effects"

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync('noop'),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(authFeatureKey,authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
  ]
};


