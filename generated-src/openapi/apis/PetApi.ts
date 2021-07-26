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
    GenericError,
    PetDto,
    ValidationError,
} from '../models';

export interface CreatePetRequest {
    body: PetDto;
}

export interface DeletePetRequest {
    id: string;
}

export interface GetPetRequest {
    id: string;
}

export interface GetPetsByUserIdRequest {
    userId: string;
}

export interface UpdatePetRequest {
    id: string;
    body: PetDto;
}

/**
 * no description
 */
export class PetApi extends BaseAPI {

    /**
     * create a new pet
     */
    createPet({ body }: CreatePetRequest): Observable<void>
    createPet({ body }: CreatePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    createPet({ body }: CreatePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(body, 'body', 'createPet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/api/pet',
            method: 'POST',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

    /**
     * delete a pet
     */
    deletePet({ id }: DeletePetRequest): Observable<void>
    deletePet({ id }: DeletePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    deletePet({ id }: DeletePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'deletePet');

        return this.request<void>({
            url: '/api/pet/{id}'.replace('{id}', encodeURI(id)),
            method: 'DELETE',
        }, opts?.responseOpts);
    };

    /**
     * return a pet
     */
    getPet({ id }: GetPetRequest): Observable<PetDto>
    getPet({ id }: GetPetRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PetDto>>
    getPet({ id }: GetPetRequest, opts?: OperationOpts): Observable<PetDto | RawAjaxResponse<PetDto>> {
        throwIfNullOrUndefined(id, 'id', 'getPet');

        return this.request<PetDto>({
            url: '/api/pet/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * return all pets ofr a user
     */
    getPetsByUserId({ userId }: GetPetsByUserIdRequest): Observable<Array<PetDto>>
    getPetsByUserId({ userId }: GetPetsByUserIdRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<PetDto>>>
    getPetsByUserId({ userId }: GetPetsByUserIdRequest, opts?: OperationOpts): Observable<Array<PetDto> | RawAjaxResponse<Array<PetDto>>> {
        throwIfNullOrUndefined(userId, 'userId', 'getPetsByUserId');

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'userId': userId,
        };

        return this.request<Array<PetDto>>({
            url: '/api/pet',
            method: 'GET',
            query,
        }, opts?.responseOpts);
    };

    /**
     * update a pet
     */
    updatePet({ id, body }: UpdatePetRequest): Observable<void>
    updatePet({ id, body }: UpdatePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    updatePet({ id, body }: UpdatePetRequest, opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        throwIfNullOrUndefined(id, 'id', 'updatePet');
        throwIfNullOrUndefined(body, 'body', 'updatePet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/api/pet/{id}'.replace('{id}', encodeURI(id)),
            method: 'PUT',
            headers,
            body: body,
        }, opts?.responseOpts);
    };

}
