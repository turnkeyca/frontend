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
    PermissionDto,
} from '../models';

export interface AcceptPermissionRequest {
    id: string;
    token: string;
}

export interface CreatePermissionRequest {
    token: string;
    body: PermissionDto;
}

export interface DeletePermissionRequest {
    id: string;
    token: string;
}

export interface GetPermissionRequest {
    id: string;
    token: string;
}

export interface GetPermissionsByUserIdRequest {
    userId: string;
    token: string;
}

/**
 * no description
 */
export class PermissionApi extends BaseAPI {

    /**
     * accept a permission
     */
    acceptPermission({ id, token }: AcceptPermissionRequest): Observable<void>
    acceptPermission({ id, token }: AcceptPermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    acceptPermission({ id, token }: AcceptPermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'acceptPermission');
        throwIfNullOrUndefined(token, 'token', 'acceptPermission');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/permission/{id}/accept'.replace('{id}', encodeURI(id)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * create a new permission
     */
    createPermission({ token, body }: CreatePermissionRequest): Observable<void>
    createPermission({ token, body }: CreatePermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    createPermission({ token, body }: CreatePermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(token, 'token', 'createPermission');
        throwIfNullOrUndefined(body, 'body', 'createPermission');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/permission',
            method: 'POST',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

    /**
     * delete a permission
     */
    deletePermission({ id, token }: DeletePermissionRequest): Observable<void>
    deletePermission({ id, token }: DeletePermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    deletePermission({ id, token }: DeletePermissionRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'deletePermission');
        throwIfNullOrUndefined(token, 'token', 'deletePermission');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/permission/{id}'.replace('{id}', encodeURI(id)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return a permission
     */
    getPermission({ id, token }: GetPermissionRequest): Observable<PermissionDto>
    getPermission({ id, token }: GetPermissionRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PermissionDto>>
    getPermission({ id, token }: GetPermissionRequest, opts?: OperationOpts): Observable<PermissionDto | RawAjaxResponse<PermissionDto>> {
        throwIfNullOrUndefined(id, 'id', 'getPermission');
        throwIfNullOrUndefined(token, 'token', 'getPermission');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<PermissionDto>({
            url: '/v1/permission/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return all permissions for a user
     */
    getPermissionsByUserId({ userId, token }: GetPermissionsByUserIdRequest): Observable<Array<PermissionDto>>
    getPermissionsByUserId({ userId, token }: GetPermissionsByUserIdRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<PermissionDto>>>
    getPermissionsByUserId({ userId, token }: GetPermissionsByUserIdRequest, opts?: OperationOpts): Observable<Array<PermissionDto> | RawAjaxResponse<Array<PermissionDto>>> {
        throwIfNullOrUndefined(userId, 'userId', 'getPermissionsByUserId');
        throwIfNullOrUndefined(token, 'token', 'getPermissionsByUserId');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'userId': userId,
        };

        return this.request<Array<PermissionDto>>({
            url: '/v1/permission',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

}
