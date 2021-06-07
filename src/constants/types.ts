import { CreditCardCompanies } from "./index";

export interface IChargeRequest {
    fullName: string,
    creditCardNumber: string,
    creditCardCompany: CreditCardCompanies,
    expirationDate: string,
    cvv: string,
    amount: number
}

export interface ICreditCardReqFields {
}

export interface IMasterCardReq extends ICreditCardReqFields{
    first_name: string,
    last_name: string,
    card_number: string,
    expiration: string,
    cvv: string
    charge_amount: number
}

export interface IMasterCardErrorRes {
    decline_reason: string
}

export interface IVisaReq extends ICreditCardReqFields{
    fullName: string,
    number: string,
    expiration: string,
    cvv: string
    totalAmount: number
}

export interface IVisaRes {
    chargeResult: string,
    resultReason: string
}

export interface ISuccessResponse {
}

export interface IErrorResponse {
    error: string
}
