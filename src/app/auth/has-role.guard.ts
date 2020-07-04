import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const tokenClaims = await this.auth.getUserClaims();
    const claims: string[] = next.data.claims;

    if (typeof claims == 'undefined') {
      console.error('Error: Missing claims data property. Example:\n' +
        '{ canActivate: [ HasRoleGuard ], data: { claims: [\'admin\'] } }');
      return false;
    }

    if (claims.length == 1) {
      return tokenClaims.includes(claims[0]);
    } else if (claims.length == 0) {
      console.error('Error: claims data property empty.');
      return false;
    } else if (claims.length > 1) {
      let res = false;

      if (typeof next.data.hasAll == undefined) {
        console.error('Error: Missing hasAll data property. Example:\n' +
          '{ canActivate: [ HasRoleGuard ], data: { claims: [\'admin\', \'user\'], hasAll: true } }');
        return false;
      } else if (typeof next.data.hasAll != 'boolean') {
        console.error('Error: hasAll data property must be boolean. Example:\n' +
          '{ canActivate: [ HasRoleGuard ], data: { claims: [\'admin\', \'user\'], hasAll: true } }');
        return false;
      }

      if (next.data.hasAll) {
        res = true;
        claims.forEach((claim: string) => {
          res = res && tokenClaims.includes(claim);
        });
      } else { // res = false
        let index = 0;
        while (!res && index < claims.length) {
          res = tokenClaims.includes(claims[index++]);
        }
      }

      return res;
    }
  }

  constructor(private auth: AuthService) { }
}
