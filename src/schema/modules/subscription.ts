import { Observable } from "rxjs";
import { pubsub } from "../../subscriptions";

export const typeDef = `
    type Subscription {
      # Subscription fires on every comment added
      clock(onlyMinutesChange: Boolean): String
    }

`;

export const resolver = {
    Subscription: {
        clock(root) {
            // TODO: Understand this.
            // return Observable.interval(1000).map(() => new Date());
            return new Date();
        },
    },
};

Observable.interval(1000)
.map(() => new Date())
.subscribe((clock: Date) => {
    pubsub.publish("clock", clock);
});
