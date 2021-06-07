import { CreditCardCompany } from "./creditCardCompany.model";
import { IVisaReq, IVisaRes } from '../constants/types'

export class VisaModel extends CreditCardCompany {
    url: string = 'https://interview.riskxint.com/visa/api/chargeCard'
    errorMsgField: string = 'resultReason'


    // @ts-ignore
    getRequestFields(requestBody: any) {
        const args: IVisaReq = {
            fullName: requestBody.fullName,
            number: requestBody.creditCardNumber,
            expiration: requestBody.expirationDate,
            cvv: requestBody.cvv,
            totalAmount: requestBody.amount
        }

        return args
    }

    // @ts-ignore
    async validResponse(res: IVisaRes): boolean {
        return res.chargeResult === 'Success'
    }

}
