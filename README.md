# NgRx Notification

[Angular Challenges](https://angular-challenges.vercel.app/challenges/ngrx/7-power-effect) #7 NgRx Notification

Right now, the app has an implementation that works without the use of ngrx effects.

## Directions

NgRx Effect is a very powerful library develop by the NgRx team. Effects subscribe to a HOT Observable and listen to any event dispatch from any place inside the application.

Effects can subscribe to ANY observables. We can wrap a hot observable inside an effect and add logic to it.

In this exercice, we will find a way to create a very powerful, scalable and maintainable push messages listener. Currently, the code is located inside a single file with a if else condition to send the push data to the right location. This code is not very scalable since we need to add more and more else, and so not very maintainable since the piece of code will become bigger and bigger.

Also, we load the whole file at startup even if we haven't load some part of the application (lazy loading); and so we don't need to listen or update that part of the store. We need to decouple that logic.

### Step 1
create an injection token to hide the push service implementation. 

### Step 2
create one ngrx effect, or component store effect for each push type, and implement your logic

### Step 3
load your effect only when necessary. the application contain a root route, a lazy loaded route and a component with a local state (implemented with Component store)

## Built With

- [Angular](https://angular.io)
- [Angular CLI](https://github.com/angular/angular-cli) 
- [NgRx](https://ngrx.io)

## Thoughts

- There are continually new students, teachers, and schools added. 
- You need to implement a notification when an add / update event happens.
- I used an Angular Material snackbar to display the notification messages.
- [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) is also a good choice to implement the same thing.  Toastr makes it slightly easier to distinctly style your notifications.  
- `{dispatch: false}` is necessary for effects that don't dispatch an action.
- `providedIn: root` helps with lazy loading.
- `@ngrx/router-store` -> a help for lazy loading ?  I don't think so.  Router store replaces the need for activated route.  This app doesn't do anything with the url.  
- Routes can take a providers array.  
- Need to investigate ` USER_PROVIDED_EFFECTS`.
- The SchoolStore is a `ComponentStore`.  Component stores have no actions so you can't listen for an action like the other stores. 
- You can inject the global store into the `ComponentStore` component and dispatch actions using the injected store.   
- "Moving state up" can help when a component is unreachable. 
- effects vs services -> In NgRx, effects essentially replace services (technically, effects are services themselves, as effects use `Injectable`).  This leads me to believe the correct way to implement this would be to eliminate the notification service.  You could also eliminate the http service, but this might bloat your effect and make it harder to read and understand.  Effects should have single responsibility.   
- There are a lot of intermediate actions / services in this app.
- The backend seems like it could be consolidated.  But from the directions, it seems like the backend doesn't need to be touched.  
- "boiler" effects -> Don't have an effect that listens for an action just for that action to call another effect.
- `create one ngrx effect, or component store effect for each push type, and implement your logic` -  so you can create mutliple effects for each type or create one effect and listen to multiple actions.  
- You don't want to perform multiple side effects inside a single effect.  You could basically recreate the if/else notification service just using an effect.  
- For this app's basic snackbar implementation, there is one action type that all the different components dispatch.  There are metadata strategies in NgRx where a single action is dispatched with extra data that can be checked inside the effect to determine the origin of the action.
- Refactoring to use `createFeature` has limited benefit.  The app uses entity adapters to handle each collection.  You could better co-locate the code in a one file (reducer), but I don't see much benefit for such a change. 
- `@ngrx/eslint-plugin` doesn't install correctly as a dev dependency when you use the `ng add @ngrx/eslint-plugin` command.
- An injection token approach doesn't seem to be a very NgRx way of adding a notification service.  The Component Store component is a huge arbitrary monkeywrench. The school component store is not really dealing with a distinct local state.  A selector could very easily provide its template with data.  
- If I add an injection token, I would want to try and use a factory to pass the data type to the token.  I don't know if you could eliminate the `isTeacher` (etc) checks.  Use a filter in the effect?
- Better to just pass push service to each component ?  Then each component gets its own instance of the service.  With the original implementation, the notification service is shared by all components.  

## Useful Resources

- [This is Angular](https://this-is-angular.github.io/ngrx-essentials-course/docs/chapter-12/) - ngrx and lazy loading
- [Angular Architects](https://www.angulararchitects.io/en/blog/routing-and-lazy-loading-with-standalone-components/) - routing and lazy loading with standalone components
- [Ng Serve](https://ngserve.io/ngrx-tutorial-handling-user-notifications-with/) - tutorial handling user notifications
- [Medium](https://ackarim.medium.com/how-to-manage-your-notifications-in-angular-ngrx-inside-effects-as-a-side-actions-6cc09ec44646) - how to manage your notifications in angular ngrx inside effects as side actions
- [Github](https://github.com/ackuser/angular-ngrx-ngx-toastr) - angular ngrx ngx toastr
- [Blog](https://timdeschryver.dev/blog/sharing-data-between-modules-is-peanuts#feature-modules) - sharing data between modules is peanuts
- [Country Code Ghost](https://country-code.ghost.io/angular-injection-token-use-cases/) - angular injection token use cases
- [Medium](https://medium.com/itnext/mastering-injectable-services-a-comprehensive-guide-6c2c0f5f48a2) - mastering injectable services a comprehensive guide
- [Medium](https://medium.com/@thomas.laforge/ngrx-effect-use-to-cache-get-request-d32e9063ba1e) - ngrx effect use to cache get request
- [Blog](https://brianflove.com/2018-03-16/ngrx-mat-snackbar/) - ngrx mat snackbar
- [YouTube](https://www.youtube.com/watch?v=ONENxWh9RHY) - NGRX/Effects - Display snack bar material UI Notifications | Dispatch multiple actions from effects
- [Medium](https://thomasburlesonia.medium.com/push-based-architectures-with-rxjs-81b327d7c32d) - push based architectures with rxjs
- [Offering Solutions](https://offering.solutions/blog/articles/2023/07/15/migrating-angular-to-ngrx-functional-apis-and-effects/) - migrating angular to ngrx functional apis and effects
- [Medium](https://medium.com/mobiroller-tech/how-to-show-a-success-or-failure-message-after-an-action-dispatched-in-ngrx-6091687d3332) - how to show a success or failure message after an action dispatched in ngrx
- [Stack Overflow](https://stackoverflow.com/questions/77450514/why-should-i-use-ngrx-if-i-have-signal) - why should I use ngrx if I have signals
- [Blog](https://timdeschryver.dev/blog/start-using-ngrx-effects-for-this#effects-basic) - start using ngrx effects for this
- [Angular Experts](https://angularexperts.io/blog/level-up-your-ng-rx-skills-with-10-time-tested-best-practices) - level up your ngrx skills with 10 time tested best practices
- [Github](https://github.com/ngrx/platform/discussions/3428) - Best practices for generic effects #3428 (Discussions)
- [Blog](https://timdeschryver.dev/blog/sharing-data-between-modules-is-peanuts#router-selectors) - sharing data between modules is peanuts
- [Medium](https://medium.com/@amcdnl/angular-routing-data-with-ngrx-effects-1cda1bd5e579) - angular routing data with ngrx effects
- [Medium](https://medium.com/ngconf/using-ngrx-component-store-exploration-fd9bd8354653) - ngrx component store exploration
- [Medium](https://blog.herodevs.com/component-store-101-main-concepts-and-ngrx-store-interactions-45645c46b1e4) - component store 101 main concepts and ngrx store interactions
- [Stack Overflow](https://stackoverflow.com/questions/71672601/ngrx-component-store-trigger-effect-when-state-changes) - ngrx component store trigger effect when state changes
- [Stack Overflow](https://stackoverflow.com/questions/71672601/ngrx-component-store-trigger-effect-when-state-changes) - ngrx component store trigger effect when state changes
- [YouTube](https://www.youtube.com/watch?v=qRAhe06UhM4) - Keeping Side Effects out of your Angular Components with NgRx ComponentStore
- [YouTube](https://www.youtube.com/playlist?list=PLaUSGD1fosVJDwcNb7ZW0JqvXgiQl4zW5) - NgRx Playlist
- [Medium](https://medium.com/@thomas.laforge/ngrx-effect-use-to-cache-get-request-d32e9063ba1e) - ngrx effect use to cache get request
- [YouTube](https://www.youtube.com/watch?v=VZsjN51fqlI) - Angular NgRx Tutorial | Episode 3 | Lazy loading the store state for a feature module
- [Blog](https://timdeschryver.dev/blog/you-should-take-advantage-of-the-improved-ngrx-apis#reducers) - you should take advantage of the improved ngrx apis
- [Github](https://github.com/ngrx/platform/issues/2920) - Listen router events using ComponentStore 
- [Angular Schule](https://angular-schule.github.io/website-articles/blog/2018-06-5-useful-effects-without-actions/README.html) - 5 useful effects without actions
- [Github](https://github.com/ngrx/platform/blob/v5.2.0/docs/store/api.md#feature-module-state-composition) - feature module state composition
- [Stack Overflow](https://stackoverflow.com/questions/49409381/multiple-stores-in-ngrx) - multiple stores in ngrx
- [Dev.to](https://dev.to/this-is-angular/manipulating-ngrx-effects-400d) - manipulating ngrx effects
- [Initgrep](https://www.initgrep.com/posts/javascript/angular/handle-side-effects-in-angular-ngrx) - handle side effects in ngrx
- [Capital One](https://www.capitalone.com/tech/software-engineering/comparison-of-ngrx-and-observable-services/) - ngrx vs services
- [YouTube](https://www.youtube.com/watch?v=6Obkrru_St8) - NgRx Effects - Avoiding Common Pitfalls
- [YouTube](https://www.youtube.com/watch?v=nuEfbgzh5_M) - NgRx industry best practices with Tomas Trajan
- [Stack Overflow](https://stackoverflow.com/questions/50105422/use-ngrx-effect-to-call-a-service-when-an-action-occurs) - ngrx effect to call a service when an action occurs (outdated)
- [Dev.to](https://dev.to/gitsobek/ngrx-listening-for-actions-5c1b) - ngrx listening for actions
- [Angular In Depth](https://angularindepth.com/posts/1206/understanding-the-magic-behind-ngrx-effects) - understanding the magic behind ngrx effects
- [Angular Snippets](https://angularsnippets.dev/snippets/component-store-with-global-state/) - component store with global state
- [Github](https://github.com/angular-eslint/angular-eslint) - Angular eslint
- [Blog](https://timdeschryver.dev/blog/an-experiment-using-the-global-ngrx-store-as-a-local-store#effects) - an experiment using the global ngrx store as a local store
- [Stack Overflow](https://stackoverflow.com/questions/68355747/having-different-providers-for-the-same-injectiontoken-at-the-route-level) - having different provider for the same injection token
- [Angular Docs](https://angular.io/api/core/InjectionToken) - Injection Token
- [Stack Overflow](https://stackoverflow.com/questions/46755241/how-to-update-dependency-injection-token-value) - how to update dependency injection token value
- [Medium](https://itnext.io/stop-being-scared-of-injectiontokens-ab22f72f0fe9) - stop being scared of injection tokens
- [Stack Overflow](https://stackoverflow.com/questions/54966953/is-there-anything-like-app-initializer-for-lazy-loaded-modules-in-angular) - is there anything like app initializer for lazy loaded modules in angular
- [Medium](https://codeburst.io/understanding-resolvers-in-angular-736e9db71267) - understanding resolvers in angular
- [Stack Overflow](https://stackoverflow.com/questions/75968163/dynamic-angular-service-injection-for-ngrx-effect) - dynamic angular service injection for ngrx effect
- [Github](https://github.com/ngrx/platform/pull/2231) - feat(effects): add user provided effects to EffectsModule.forFeature #2231
- [YouTube](https://www.youtube.com/watch?v=9FH3yhfdXe4&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=63) - #63 Hierarchical Dependency Injection | Services & Dependency Injection | A Complete Angular Course
- [Blog](https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f) - 6 ways to unsubscribe from observables