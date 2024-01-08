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
