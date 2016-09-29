export const typeDef = `
# Root Subscription
type Subscription {
    clock(throttle: Int): String
}
`;

export const resolver = {
    Subscription: {
        clock(root, args, ctx) {
            if ( undefined === args.throttle ) {
                return ctx.clockSource;
            } else {
                return ctx.clockSource.throttleTime(args.throttle);
            }
        },
    },
};
