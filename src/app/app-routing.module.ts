import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DefaultRouterStateSerializer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { routes } from "./app.routes";

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
