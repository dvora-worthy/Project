import { body, header } from 'express-validator'
import { CREDIT_CARD_COMPANIES }  from '../constants'

export const ChargeMiddleware = {
    validateRequestParams(): any {
        return [
            header('merchant-identifier').exists().isString(),

            body('fullName').exists().isString(),
            body('creditCardNumber').exists().isString(),
            body('creditCardCompany').exists().isIn(CREDIT_CARD_COMPANIES),
            body('expirationDate').exists().custom((value: String) => {
                const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
                return value.match(dateRegex)
            }),
            body('cvv').exists().isString(),
            body('amount').exists().isDecimal()
        ]
    }
}

