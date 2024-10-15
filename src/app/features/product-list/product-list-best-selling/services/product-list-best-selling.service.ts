import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { constants } from "../../../../../constants";
import { ProductModel } from "../../../../core/domain/product.model";

@Injectable({
    providedIn: 'root',
})
export class ProductListBestSellingService {
    private isLoadingSubject:           BehaviorSubject<boolean>;
    private isLoadingSuccessSubject:    BehaviorSubject<boolean>;
    private isLoadingFailureSubject:    BehaviorSubject<boolean>;
    private httpErrorResponseSubject:   BehaviorSubject<HttpErrorResponse | undefined>;
    private productsSubject:            BehaviorSubject<ProductModel[]>;

    constructor(private httpClient: HttpClient) {
        this.isLoadingSubject          = new BehaviorSubject<boolean>(false);
        this.isLoadingSuccessSubject   = new BehaviorSubject<boolean>(false);
        this.isLoadingFailureSubject   = new BehaviorSubject<boolean>(false);
        this.httpErrorResponseSubject  = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);
        this.productsSubject           = new BehaviorSubject<ProductModel[]>([]);
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

    public get products$(): Observable<ProductModel[]> {
        return this.productsSubject.asObservable();
    }

    sendGetAllProductsRequest() {
        this.resetAuthState();
        this.isLoadingSubject.next(true);

        this.httpClient
            .get<any>(
                constants.backend.endpoints.products
            )
            .pipe(
                map(
                    response => response._embedded.products.map((product: any) =>
                        new ProductModel(
                            product.title,
                            product.description,
                            product.manufacturer,
                            product.price,
                            product.promotionalPrice
            ))))
            .subscribe({
                next: response => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingSuccessSubject.next(true);
                    this.productsSubject.next(response)
                },
                error: error => {
                    this.isLoadingSubject.next(false);
                    this.isLoadingFailureSubject.next(true);
                    this.httpErrorResponseSubject.next(error);
                }
            });
    }

    logOut() {
        this.resetAuthState();
    }

    private resetAuthState() {
        this.isLoadingSubject.next(false);
        this.isLoadingSuccessSubject.next(false);
        this.isLoadingFailureSubject.next(false);
        this.httpErrorResponseSubject.next(undefined);
    }

}
