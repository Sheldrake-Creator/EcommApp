import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthInterceptorComponent } from './Shared/Interceptors/auth-interceptor/auth-interceptor.component';
import * as authEffects from './Shared/State/Auth/Store/auth.effects';
import {
  authFeatureKey,
  authReducer,
} from './Shared/State/Auth/Store/auth.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorComponent,
      multi: true,
    },
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
  ],
};
