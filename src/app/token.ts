import { InjectionToken, inject } from "@angular/core";
import { Observable } from "rxjs";
import { PushService } from "src/backend/push.service";
import { Push } from "src/model/push.model";

export type TokenType = Observable<Push | undefined>;
export const TOKEN = new InjectionToken<TokenType>('PUSH', {
  factory() {
    return inject(PushService).notification$;
  }
});

/*
// this approach saves you from having to do some intermediate steps
// i.e.
// less local variables needed
// don't think you have to worry about unsubscribing
// should be easy to test
*/