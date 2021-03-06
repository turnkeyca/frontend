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
    RoommateDto,
} from '../models';

export interface CreateRoommateRequest {
    token: string;
    body: RoommateDto;
}

export interface DeleteRoommateRequest {
    id: string;
    token: string;
}

export interface GetRoommateRequest {
    id: string;
    token: string;
}

export interface GetRoommatesByUserIdRequest {
    userId: string;
    token: string;
}

export interface UpdateRoommateRequest {
    id: string;
    token: string;
    body: RoommateDto;
}

/**
 * no description
 */
export class RoommateApi extends BaseAPI {

    /**
     * create a new roommate
     */
    createRoommate({ token, body }: CreateRoommateRequest): Observable<void>
    createRoommate({ token, body }: CreateRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    createRoommate({ token, body }: CreateRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(token, 'token', 'createRoommate');
        throwIfNullOrUndefined(body, 'body', 'createRoommate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/roommate',
            method: 'POST',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

    /**
     * delete a roommate
     */
    deleteRoommate({ id, token }: DeleteRoommateRequest): Observable<void>
    deleteRoommate({ id, token }: DeleteRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    deleteRoommate({ id, token }: DeleteRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'deleteRoommate');
        throwIfNullOrUndefined(token, 'token', 'deleteRoommate');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/roommate/{id}'.replace('{id}', encodeURI(id)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return a roommate
     */
    getRoommate({ id, token }: GetRoommateRequest): Observable<RoommateDto>
    getRoommate({ id, token }: GetRoommateRequest, opts?: OperationOpts): Observable<RawAjaxResponse<RoommateDto>>
    getRoommate({ id, token }: GetRoommateRequest, opts?: OperationOpts): Observable<RoommateDto | RawAjaxResponse<RoommateDto>> {
        throwIfNullOrUndefined(id, 'id', 'getRoommate');
        throwIfNullOrUndefined(token, 'token', 'getRoommate');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<RoommateDto>({
            url: '/v1/roommate/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * return all roommates for a user
     */
    getRoommatesByUserId({ userId, token }: GetRoommatesByUserIdRequest): Observable<Array<RoommateDto>>
    getRoommatesByUserId({ userId, token }: GetRoommatesByUserIdRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<RoommateDto>>>
    getRoommatesByUserId({ userId, token }: GetRoommatesByUserIdRequest, opts?: OperationOpts): Observable<Array<RoommateDto> | RawAjaxResponse<Array<RoommateDto>>> {
        throwIfNullOrUndefined(userId, 'userId', 'getRoommatesByUserId');
        throwIfNullOrUndefined(token, 'token', 'getRoommatesByUserId');

        const headers: HttpHeaders = {
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'userId': userId,
        };

        return this.request<Array<RoommateDto>>({
            url: '/v1/roommate',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * update a roommate
     */
    updateRoommate({ id, token, body }: UpdateRoommateRequest): Observable<void>
    updateRoommate({ id, token, body }: UpdateRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    updateRoommate({ id, token, body }: UpdateRoommateRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'updateRoommate');
        throwIfNullOrUndefined(token, 'token', 'updateRoommate');
        throwIfNullOrUndefined(body, 'body', 'updateRoommate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(token != null ? { 'Token': String(token) } : undefined),
        };

        return this.request<void>({
            url: '/v1/roommate/{id}'.replace('{id}', encodeURI(id)),
            method: 'PUT',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

}
