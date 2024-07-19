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
import { routes } from './app.routes';
import * as addressEffets from './Store/Address/address.effects';
import {
  addressFeatureKey,
  addressReducer,
} from './Store/Address/address.reducer';
import * as authEffects from './Store/Auth/auth.effects';
import { authFeatureKey, authReducer } from './Store/Auth/auth.reducer';
import * as cartEffects from './Store/Cart/cart.effects';
import { cartFeatureKey, cartReducer } from './Store/Cart/cart.reducer';
import * as orderEffects from './Store/Order/order.effects';
import { orderFeatureKey, orderReducer } from './Store/Order/order.reducer';
import * as productEffects from './Store/Product/product.effects';
import {
  productFeatureKey,
  productReducer,
} from './Store/Product/product.reducer';
import { authInterceptor } from './Util/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideState(productFeatureKey, productReducer),
    provideEffects(productEffects),
    provideState(addressFeatureKey, addressReducer),
    provideEffects(addressEffets),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideState(cartFeatureKey, cartReducer),
    provideEffects(cartEffects),
    provideState(orderFeatureKey, orderReducer),
    provideEffects(orderEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
  ],
};
