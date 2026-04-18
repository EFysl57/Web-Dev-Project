import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    const isAuthRequired = req.url.includes('/cart') || req.url.includes('/profile');
    if (token && isAuthRequired) {
        req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });
    }

    return next(req);
}



