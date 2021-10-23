import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ItemNotSelected } from "../error-definition/item-not-selected.error";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error) {
    /**
     * Errors of this type should not be handled, since they are "scapers"
     */
    if (error instanceof ItemNotSelected) {
      return;
    }

    if(error instanceof HttpErrorResponse){
      // have already been treated by the request interceptor
      return;
    }

    throw error;
  }
}
