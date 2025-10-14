import { IApiConfig } from "@core/endpoints";
import { donationEndpoints } from "./donation/endpoints";

export const apiConfig:IApiConfig = {
    ...donationEndpoints,
}