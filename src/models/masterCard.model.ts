import { CreditCardCompany } from './creditCardCompany.model'
import { IMasterCardReq, IMasterCardErrorRes } from "../constants/types";


export class MasterCardModel extends CreditCardCompany {
    url: string = process.env.MASTER_CARD_CHARGE_URL
    errorMsgField: string = 'decline_reason'

    // @ts-ignore
    getRequestFields(requestBody: any) {
        const [firstName, lastName] = requestBody.fullName.split(' ')
        const args: IMasterCardReq = {
            first_name: firstName,
            last_name: lastName,
            card_number: requestBody.creditCardNumber,
            expiration: requestBody.expirationDate.replace('/', '-'),
            cvv: requestBody.cvv,
            charge_amount: requestBody.amount
        }

        return args
    }

    // @ts-ignore
    async validResponse(res: {}|IMasterCardErrorRes): boolean {
        return res === 'OK'
    }
}
