import axios, { AxiosError, AxiosResponse } from 'axios'
import { businessErrors } from "../constants";
import { IChargeRequest, ICreditCardReqFields, ISuccessResponse, IErrorResponse } from '../constants/types'


export abstract class CreditCardCompany {
    protected url: string
    protected errorMsgField: string
    private errorMsg = 'Card declined'

    abstract getRequestFields(request: IChargeRequest): ICreditCardReqFields
    abstract validResponse(): boolean


    public async sendChargeRequest(requestBody: IChargeRequest): Promise<ISuccessResponse|IErrorResponse> {
        return this.requestWithRetry(requestBody)
            .then(async (res: AxiosResponse) => {
                // @ts-ignore
                return await this.validResponse(res.data) ? {} : { error: this.errorMsg }
            })
            .catch((err: AxiosError) => {
                return { error: this.errorMsg }
            })
    }

    private requestWithRetry(requestBody: IChargeRequest){
        return new Promise((resolve, reject) => {
            let attempts = 1
            const fields = this.getRequestFields(requestBody)

            const delay = (n: number) => {
                setTimeout(() => {
                    attempts++

                    retry(n - 1)
                }, Math.pow(attempts, 2) * 1000)
            }

            const retry = async (i: number) => {
                return await axios.post(this.url, fields, {headers: {identifier: process.env.REQUEST_IDENTIFIER}})
                    .then(res => {
                        const status = res.status

                        if(status === 200) {
                            return resolve(res)
                        }
                        else if (i === 1) {
                            reject('attempts ended')
                        }
                        else {  delay(i)  }
                }).catch((error) => {
                    const errMsg = error.response.data[this.errorMsgField]

                    if(businessErrors.includes(errMsg)) {
                        resolve()
                    }
                    if (i === 1) {
                        reject(error)
                    }
                    else { delay(i) }
                })
            }
            return retry(parseInt(process.env.MAX_RETRIES))
        })
    }
}
