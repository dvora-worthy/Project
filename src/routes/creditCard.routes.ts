import { Router } from 'express';
import { CreditCardController } from '../controllers/creditCard.controller'
import { ChargeMiddleware } from '../middlewares/charge.middleware'


const router = Router();
router.post('/api/charge',
    ChargeMiddleware.validateRequestParams(),
    CreditCardController.chargeApi)


export default router
