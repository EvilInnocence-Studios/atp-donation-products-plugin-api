import { HandlerArgs } from "@core/express/types";
import { CheckPermissions } from "@uac/permission/util";
import { Query } from "pg";
import { IDonation, NewDonation } from "src/donation-products-plugin-shared/donation/types";
import { pipe, pipeTo } from "ts-functional";
import { Donation } from "./service";
import { getBody, getParam, getParams } from "@core/express/extractors";

class DonationHandlerClass {
    @CheckPermissions("donation.view")
    public get (...args: HandlerArgs<Query>):Promise<IDonation> {
        return pipeTo(Donation.loadById, getParam("donationId"))(args);
    }

    @CheckPermissions("donation.view")
    public search (...args: HandlerArgs<Query>):Promise<IDonation[]> {
        return pipeTo(Donation.search, pipe(getParams, q => ({...q, status: "completed"})))(args);
    }

    @CheckPermissions("donation.create")
    public start (...args: HandlerArgs<Partial<NewDonation>>):Promise<IDonation> {
        return pipeTo(
            Donation.start,
            getParam("userId"),
            getBody,
        )(args);
    }

    @CheckPermissions("donation.update")
    public finalize (...args: HandlerArgs<Query>):Promise<IDonation> {
        return pipeTo(Donation.finalize, getParam("transactionId"))(args);
    }

    @CheckPermissions("donation.delete")
    public delete (...args: HandlerArgs<Query>):Promise<IDonation> {
        return pipeTo(Donation.remove, getParam("donationId"))(args);
    }
}

export const DonationHandler = new DonationHandlerClass();