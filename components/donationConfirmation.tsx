import React from 'react';
import { getAppConfig } from '../../../config';
import { IDonation } from "../../donation-products-plugin-shared/donation/types";
import { SafeUser } from '../../uac-shared/user/types';
import { IOrder } from '../../store-shared/order/types';

export declare interface IOrderConfirmationProps {
    user: SafeUser;
    donation: IDonation;
    order: IOrder;
}

export const DonationConfirmation = ({user, donation, order}:IOrderConfirmationProps) => <>
    <style>
        {`
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 5px;
                text-align: left;
            }
            tbody tr:nth-child(odd) {
                background-color: #f2f2f2;
            }
            tbody tr:nth-child(even) {
                background-color: #ffffff;
            }
            tfoot {
                border-top: 2px solid black;
                font-weight: bold;
            }
        `}
    </style>
    <div>
        <h1>Donation Confirmation</h1>
        <p>Hi {user.userName},</p>
        <p>Your donation of ${donation.amount.toFixed(2)} has been completed.  If your donation included downloadable content, the files should be available to download in <a href={`${getAppConfig().publicHost}/my-account/orders/${order.id}`}>your account</a></p>
        <p>Order ID: {order.id}</p>
        <p>Thank you for your generosity!</p>
        <p><a href={`${getAppConfig().publicHost}/my-account/orders`}>View your orders</a></p>
    </div>
</>;