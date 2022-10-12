import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { ErrorPersonilized } from "./error.personalized";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof ErrorPersonilized) {
    } else {
      if (!error.message.includes("No current user")) {
        throw new Error(error.message);
      }
    }
  }
}
