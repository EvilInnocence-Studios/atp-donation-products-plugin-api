import { DonationHandler } from "./handlers";

export const donationEndpoints = {
    user: {
        ":userId": {
            donation: {
                GET: DonationHandler.search,
                ":donationId": {
                    GET: DonationHandler.get,
                    DELETE: DonationHandler.delete,
                },
                start: {
                    POST: DonationHandler.start,
                },
                finalize: {
                    POST: DonationHandler.finalize,
                },
            }
        }
    }
}
