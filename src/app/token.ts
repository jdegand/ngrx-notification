import { FactoryProvider, InjectionToken, inject } from '@angular/core';
import { PushService } from 'src/backend/push.service';

/*
export const TOKEN = new InjectionToken<string>('TOKEN', {
  factory: () => 'teacher',  // teacher is the default 
});

// Basic token -> need to inject the push service into the token instead
*/

export const TOKEN = new InjectionToken<string>('PUSH');

export const pushProvider = (): FactoryProvider => ({
  provide: TOKEN,
  useFactory: () => inject(PushService),
});
