// tslint:disable
/**
 * of Turnkey API
 * Documentation for Turnkey API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    GenericError,
    RegisterTokenDto,
    Token,
} from '../models';

export interface RegisterNewTokenRequest {
    body: RegisterTokenDto;
}

/**
 * no description
 */
export class AuthApi extends BaseAPI {

    /**
     * register token
     */
    registerNewToken({ body }: RegisterNewTokenRequest): Observable<Token>
    registerNewToken({ body }: RegisterNewTokenRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Token>>
    registerNewToken({ body }: RegisterNewTokenRequest, opts?: OperationOpts): Observable<Token | RawAjaxResponse<Token>> {
        throwIfNullOrUndefined(body, 'body', 'registerNewToken');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<Token>({
            url: '/api/auth/registertoken',
            method: 'POST',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

}
