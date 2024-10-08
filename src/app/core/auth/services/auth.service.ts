import { Injectable } from "@angular/core";
import { AuthRequestBodyModel } from "../../models/auth-request-body.model";
import { AuthResponseSuccess } from "./interfaces/auth-response-success";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { constants } from "../../../../constants";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoadingSubject:          BehaviorSubject<boolean>;
    private isLoadingSuccessSubject:   BehaviorSubject<boolean>;
    private isLoadingFailureSubject:   BehaviorSubject<boolean>;
    private loggedUserNameSubject:     BehaviorSubject<string>;
    private authTokenSubject:          BehaviorSubject<string>;
    private httpErrorResponseSubject:  BehaviorSubject<HttpErrorResponse | undefined>;

    constructor(private httpClient: HttpClient) {
        this.isLoadingSubject          = new BehaviorSubject<boolean>(false);
        this.isLoadingSuccessSubject   = new BehaviorSubject<boolean>(false);
        this.isLoadingFailureSubject   = new BehaviorSubject<boolean>(false);
        this.loggedUserNameSubject     = new BehaviorSubject<string>('');
        this.authTokenSubject          = new BehaviorSubject<string>('');
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

    public get loggedUsername$(): Observable<string> {
        return this.loggedUserNameSubject.asObservable();
    }

    public get authToken$(): Observable<string> {
        return this.authTokenSubject.asObservable();
    }

    public get httpErrorResponse$(): Observable<HttpErrorResponse | undefined> {
        return this.httpErrorResponseSubject.asObservable();
    }

    sendAuthRequest(requestBody: AuthRequestBodyModel) {
        this.resetAuthState();
        this.isLoadingSubject.next(true);

        this.httpClient
            .post<AuthResponseSuccess>(
                constants.backend.endpoints.authenticate,
                requestBody
            ).subscribe({
                next: response => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingSuccessSubject.next(true);
                    this.authTokenSubject.next(response.token);
                },
                error: error => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingFailureSubject.next(true);
                    this.httpErrorResponseSubject.next(error);
                }
            });
    }

    private resetAuthState() {
        this.isLoadingSubject.next(false);
        this.isLoadingSuccessSubject.next(false);
        this.isLoadingFailureSubject.next(false);
        this.loggedUserNameSubject.next('');
        this.authTokenSubject.next('');
        this.httpErrorResponseSubject.next(undefined);
    }

}
