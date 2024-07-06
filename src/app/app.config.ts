import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './Interceptors/auth.interceptor';
import * as authEffects from './Store/Auth/auth.effects';
import { authFeatureKey, authReducer } from './Store/Auth/auth.reducer';
import * as cartEffects from './Store/Cart/cart.effects';
import { cartFeatureKey, cartReducer } from './Store/Cart/cart.reducer';
import * as productEffects from './Store/Product/product.effects';
import {
  productFeatureKey,
  productReducer,
} from './Store/Product/product.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideState(productFeatureKey, productReducer),
    provideEffects(productEffects),
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
