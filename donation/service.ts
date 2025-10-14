import { basicCrudService } from "@core/express/service/common";
import { captureOrder, createOrder } from "@core/paypal";
import { render } from "@core/render";
import { Order } from "@store/order/service";
import { User } from "@uac/user/service";
import { IDonation, NewDonation } from "src/donation-products-plugin-shared/donation/types";
import { DonationConfirmation } from "../components/donationConfirmation";
import { Setting } from "@common/setting/service";
import { sendEmail } from "@core/sendEmail";

export const Donation = {
    ...basicCrudService<IDonation>("donations", "id"),
    start: async (userId: string, donation:{amount: number, productId: string, note: string}):Promise<IDonation> => {
        const payPalResult = await createOrder(() => Promise.resolve([
            {
                id: "donation",
                name: "Donation",
                quantity: 1,
                unit_amount: {
                    currency_code: "USD",
                    value: donation.amount.toString(),
                },
            },
        ]), donation.amount);

        const newDonation = await Donation.create({
            ...donation,
            userId,
            status: "pending",
            transactionId: payPalResult?.jsonResponse?.id || "",
            createdAt: new Date().toISOString(),
        });
        
        return newDonation;
    },
    finalize: async (transactionId: string):Promise<IDonation> => {
        const donation = await Donation.loadBy("transactionId")(transactionId);

        if(donation.status === "completed") {
            return donation;
        }

        if(donation.transactionId && donation.status === "pending") {
            // Finalize the order
            const payPalResult = await captureOrder(donation.transactionId);
            const updated = await Donation.update(donation.id, { status: "completed" });

            // Create the store order
            const order = await Order.createFromProducts([donation.productId], donation.userId);

            // Send confirmation email
            const user = await User.loadById(donation.userId);
            const html = render(DonationConfirmation, { user, donation, order });
            const supportEmail = await Setting.get("supportEmail");
            const subject = await Setting.get("donationConfirmationSubject");
            await sendEmail(
                subject,
                html,
                [user.email, supportEmail]);

            return updated;
            
        }

        return donation;
    }
}