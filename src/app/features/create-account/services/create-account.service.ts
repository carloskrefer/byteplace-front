import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { constants } from "../../../../constants";
import { CreateAccountRequestBodyModel } from "../models/create-account-request-body.model";

@Injectable({
    providedIn: 'root',
})
export class CreateAccountService {
    private isLoadingSubject:          BehaviorSubject<boolean>;
    private isLoadingSuccessSubject:   BehaviorSubject<boolean>;
    private isLoadingFailureSubject:   BehaviorSubject<boolean>;
    private httpErrorResponseSubject:  BehaviorSubject<HttpErrorResponse | undefined>;

    constructor(private httpClient: HttpClient) {
        this.isLoadingSubject          = new BehaviorSubject<boolean>(false);
        this.isLoadingSuccessSubject   = new BehaviorSubject<boolean>(false);
        this.isLoadingFailureSubject   = new BehaviorSubject<boolean>(false);
        this.httpErrorResponseSubject  = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);
    }

    public get isLoading$(): Observable<boolean> {
        return this.isLoadingSubject.asObservable();
    }

    public get isLoadingSuccess$(): Observable<boolean> {
        return this.isLoadingSuccessSubject.asObservable();
    }

    public get isLoadingFailure$(): Observable<boolean> {
        return this.isLoadingFailureSubject.asObservable();
    }

    public get httpErrorResponse$(): Observable<HttpErrorResponse | undefined> {
        return this.httpErrorResponseSubject.asObservable();
    }

    sendCreateAccountRequest(requestBody: CreateAccountRequestBodyModel) {
        this.resetCreateAccountState();
        this.isLoadingSubject.next(true);

        this.httpClient
            .post(
                constants.backend.endpoints.register,
                requestBody
            ).subscribe({
                next: response => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingSuccessSubject.next(true);
                },
                error: error => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingFailureSubject.next(true);
                    this.httpErrorResponseSubject.next(error);
                }
            });
    }

    resetCreateAccountState() {
        this.isLoadingSubject.next(false);
        this.isLoadingSuccessSubject.next(false);
        this.isLoadingFailureSubject.next(false);
        this.httpErrorResponseSubject.next(undefined);
    }

}
