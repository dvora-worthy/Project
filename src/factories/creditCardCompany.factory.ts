import { VisaModel } from "../models/visa.model";
import { MasterCardModel } from "../models/masterCard.model";
import { CreditCardCompany } from "../models/creditCardCompany.model";
import { CreditCardCompanies } from "../constants";

export class CreditCardCompanyFactory {
    private static readonly companyMappings = {
        [CreditCardCompanies.Visa]: VisaModel,
        [CreditCardCompanies.MasterCard]: MasterCardModel,
    }

    public static create(creditCardCompany: CreditCardCompanies): CreditCardCompany {
        // @ts-ignore
        return new this.companyMappings[creditCardCompany]();
    };
}
