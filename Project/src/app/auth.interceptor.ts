import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    const requireToken = req.url.includes('cart')  || req.url.includes('profile');
    if (token && requireToken) {
        req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });
    }

    return next(req);
}



