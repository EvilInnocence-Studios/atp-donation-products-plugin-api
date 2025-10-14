import { del, get, patch, post, upload } from "../../core/express/wrappers";
import { DonationHandler } from "./handlers";

export const donationEndpoints = {
    user: {
        ":userId": {
            donation: {
                GET: get(DonationHandler.search),
                ":donationId": {
                    GET: get(DonationHandler.get),
                    DELETE: del(DonationHandler.delete),
                },
                start: {
                    POST: post(DonationHandler.start),
                },
                finalize: {
                    POST: post(DonationHandler.finalize),
                },
            }
        }
    }
}
