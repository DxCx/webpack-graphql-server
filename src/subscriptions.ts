import { PubSub, SubscriptionManager } from "graphql-subscriptions";
import { Schema } from "./schema";

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
    schema: Schema,
    pubsub,
    setupFunctions: {
        clock: (options, args) => ({
            clock: (clock: Date) => {
                const onlyMinutesArg = "onlyMinutesChange";
                if ( args[onlyMinutesArg] ) {
                    return clock.getTime() % 60 === 0;
                }
                return true;
            },
        }),
    },
});

export { subscriptionManager, pubsub };
