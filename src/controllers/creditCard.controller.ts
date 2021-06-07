import { Request, Response } from 'express';
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { CreditCardCompanyFactory } from '../factories/creditCardCompany.factory'


export const CreditCardController =  {
    chargeApi: async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(StatusCodes.BAD_REQUEST).json({});
                return
            }

            const companyModal = CreditCardCompanyFactory.create(req.body.creditCardCompany);
            const response = await companyModal.sendChargeRequest(req.body)

            res.status(StatusCodes.OK).json(response)
        }
        catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
        }
    }
}
