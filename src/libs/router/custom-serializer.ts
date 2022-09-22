import * as R from 'ramda';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const url =
      '/' +
      route.pathFromRoot
        .filter(snapshot => !R.isEmpty(snapshot.url))
        .map(snapshot => snapshot.url.map(segment => segment.path).join('/'))
        .join('/');

    const queryParams = routerState.root.queryParams;
    const params = route.params;

    return { url, params, queryParams };
  }
}
