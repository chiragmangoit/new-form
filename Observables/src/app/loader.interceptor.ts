import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { LoaderService } from "./services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  [x: string]: any;
  constructor(private injector:Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes("undefined")) {
      return next.handle(req);
    }

    const loaderService = this.injector.get(LoaderService);

    loaderService.show();

    return next.handle(req).pipe(
      delay(2000),
      finalize(() => loaderService.hide())
    );
  }
}
