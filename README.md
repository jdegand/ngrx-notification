# NgRx Notification

[Angular Challenges](https://github.com/tomalaforge/angular-challenges) #7 NgRx Notification

Right now, I have added a snackbar alert for each `add` action.  Alerts are shown regardless of route.

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
- Angular Material snackbar ?
- `{dispatch: false}` is necessary for effects that don't dispatch an action.
- `providedIn: root` helps with lazy loading.
- `@ngrx/router-store` -> a help for lazy loading ?
- Need to investigate ` USER_PROVIDED_EFFECTS`.
- The SchoolStore is a `ComponentStore`.  Component stores have no actions so you can't listen for an action like the other stores.  

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