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
import { BaseAPI, HttpHeaders, HttpQuery, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    EmploymentDto,
} from '../models';

export interface CreateEmploymentRequest {
    token: string;
    body: EmploymentDto;
}

export interface DeleteEmploymentRequest {
    id: string;
    token: string;
}

export interface GetEmploymentRequest {
    id: string;
    token: string;
}

export interface GetEmploymentsByUserIdRequest {
    userId: string;
    token: string;
}

export interface UpdateEmploymentRequest {
    id: string;
    token: string;
    body: EmploymentDto;
}

/**
 * no description
 */
export class EmploymentApi extends BaseAPI {

    /**
     * create a new employment
     */
    createEmployment({ token, body }: CreateEmploymentRequest): Observable<void>
    createEmployment({ token, body }: CreateEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    createEmployment({ token, body }: CreateEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(token, 'token', 'createEmployment');
        throwIfNullOrUndefined(body, 'body', 'createEmployment');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/employment',
            method: 'POST',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

    /**
     * delete a employment
     */
    deleteEmployment({ id, token }: DeleteEmploymentRequest): Observable<void>
    deleteEmployment({ id, token }: DeleteEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    deleteEmployment({ id, token }: DeleteEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'deleteEmployment');
        throwIfNullOrUndefined(token, 'token', 'deleteEmployment');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/employment/{id}'.replace('{id}', encodeURI(id)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return an employment
     */
    getEmployment({ id, token }: GetEmploymentRequest): Observable<EmploymentDto>
    getEmployment({ id, token }: GetEmploymentRequest, opts?: OperationOpts): Observable<RawAjaxResponse<EmploymentDto>>
    getEmployment({ id, token }: GetEmploymentRequest, opts?: OperationOpts): Observable<EmploymentDto | RawAjaxResponse<EmploymentDto>> {
        throwIfNullOrUndefined(id, 'id', 'getEmployment');
        throwIfNullOrUndefined(token, 'token', 'getEmployment');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<EmploymentDto>({
            url: '/v1/employment/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return employments for a user
     */
    getEmploymentsByUserId({ userId, token }: GetEmploymentsByUserIdRequest): Observable<Array<EmploymentDto>>
    getEmploymentsByUserId({ userId, token }: GetEmploymentsByUserIdRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<EmploymentDto>>>
    getEmploymentsByUserId({ userId, token }: GetEmploymentsByUserIdRequest, opts?: OperationOpts): Observable<Array<EmploymentDto> | RawAjaxResponse<Array<EmploymentDto>>> {
        throwIfNullOrUndefined(userId, 'userId', 'getEmploymentsByUserId');
        throwIfNullOrUndefined(token, 'token', 'getEmploymentsByUserId');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'userId': userId,
        };

        return this.request<Array<EmploymentDto>>({
            url: '/v1/employment',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * update a employment
     */
    updateEmployment({ id, token, body }: UpdateEmploymentRequest): Observable<void>
    updateEmployment({ id, token, body }: UpdateEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    updateEmployment({ id, token, body }: UpdateEmploymentRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'updateEmployment');
        throwIfNullOrUndefined(token, 'token', 'updateEmployment');
        throwIfNullOrUndefined(body, 'body', 'updateEmployment');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/employment/{id}'.replace('{id}', encodeURI(id)),
            method: 'PUT',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

}
