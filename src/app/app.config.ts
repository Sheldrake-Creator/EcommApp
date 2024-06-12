import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthInterceptor } from './Interceptors/auth-interceptor/auth-interceptor.service';
import * as authEffects from './Store/Auth/auth.effects';
import { authFeatureKey, authReducer } from './Store/Auth/auth.reducer';
import * as cartEffects from './Store/Cart/cart.effects';
import { cartFeatureKey, cartReducer } from './Store/Cart/cart.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideState(cartFeatureKey, cartReducer),
    provideEffects(cartEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
  ],
};
