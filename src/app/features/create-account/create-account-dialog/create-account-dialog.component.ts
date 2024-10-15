import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SharedMessageBarComponent } from '../../../shared/shared-message-bar/shared-message-bar.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedFormFieldNameComponent } from '../../../shared/shared-form-field/shared-form-field-name/shared-form-field-name.component';
import { SharedFormFieldEmailComponent } from '../../../shared/shared-form-field/shared-form-field-email/shared-form-field-email.component';
import { SharedFormFieldPasswordComponent } from '../../../shared/shared-form-field/shared-form-field-password/shared-form-field-password.component';
import { SharedFormFieldPostalCodeComponent } from '../../../shared/shared-form-field/shared-form-field-postal-code/shared-form-field-postal-code.component';
import { SharedFormFieldCityComponent } from "../../../shared/shared-form-field/shared-form-field-city/shared-form-field-city.component";
import { SharedFormFieldStateComponent } from "../../../shared/shared-form-field/shared-form-field-state/shared-form-field-state.component";
import { SharedFormFieldStreetComponent } from "../../../shared/shared-form-field/shared-form-field-street/shared-form-field-street.component";
import { SharedFormFieldBuildingNumberComponent } from "../../../shared/shared-form-field/shared-form-field-building-number/shared-form-field-building-number.component";
import { SharedFormFieldDistrictComponent } from "../../../shared/shared-form-field/shared-form-field-district/shared-form-field-district.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateAccountAddressModel, CreateAccountRequestBodyModel } from '../models/create-account-request-body.model';
import { CreateAccountService } from '../services/create-account.service';
import { SharedFormFieldBuildingComplementComponent } from '../../../shared/shared-form-field/shared-form-field-building-complement/shared-form-field-building-complement.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-account-dialog',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AsyncPipe,
    SharedMessageBarComponent,
    MatDialogModule,
    SharedFormFieldNameComponent,
    SharedFormFieldEmailComponent,
    SharedFormFieldPasswordComponent,
    SharedFormFieldPostalCodeComponent,
    SharedFormFieldCityComponent,
    SharedFormFieldStateComponent,
    SharedFormFieldStreetComponent,
    SharedFormFieldBuildingNumberComponent,
    SharedFormFieldDistrictComponent,
    SharedFormFieldBuildingComplementComponent,
    MatCheckboxModule,
    CommonModule
],
    templateUrl: './create-account-dialog.component.html',
    styleUrl: './create-account-dialog.component.scss'
})
export class CreateAccountDialogComponent implements OnInit {
    isLoadingFailure$!: Observable<boolean>;
    isLoading$!: Observable<boolean>;

    isLoadingSuccessSubscription!: Subscription;

    formSubmitSubject$: Subject<void> = new Subject<void>();
    formSubmit$!: Observable<void>;

    mainFormGroup!: FormGroup;
    billingAddressFormGroup!: FormGroup;
    shippingAddressFormGroup!: FormGroup;

    isBillingShippingAddressSame: boolean = true;

    constructor(
        private createAccountService: CreateAccountService,
        private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.configureForm();
        this.configureObservables();
        this.subscribeToCreateAccountSuccess();
    }

    private configureForm(): void {
        this.billingAddressFormGroup = new FormGroup({});
        this.shippingAddressFormGroup = new FormGroup({});

        this.mainFormGroup = new FormGroup({
            'billingAddress': this.billingAddressFormGroup,
            'shippingAddress': this.shippingAddressFormGroup
        });
    }

    private configureObservables() {
        this.formSubmit$ = this.formSubmitSubject$.asObservable();
        this.isLoading$ = this.createAccountService.isLoading$;
        this.isLoadingFailure$ = this.createAccountService.isLoadingFailure$;
    }

    private subscribeToCreateAccountSuccess() {
        this.createAccountService.isLoadingSuccess$.subscribe(
            isLoadingSuccess => {
                if (isLoadingSuccess)
                    this.onCreateAccountSuccess();
            }
        );
    }

    onCreateAccountSuccess() {
        this.showSuccessSnackbar();
        this.closeDialog();
    }

    closeDialog() {
        this.createAccountService.resetCreateAccountState();
        this.dialogRef.close();
    }

    showSuccessSnackbar() {
        this.snackbar.open('Conta criada com sucesso!', "Ok", {duration: 5000, verticalPosition: 'top'})
    }

    onSubmit(): void {
        if (this.isBillingShippingAddressSame)
            this.copyBillingToShippingAddressValues();

        this.formSubmitSubject$.next();

        if (this.mainFormGroup.invalid)
            return;

        this.sendCreateAccountHttpRequest();
    }

    private copyBillingToShippingAddressValues() {
        this.shippingAddressFormGroup.patchValue(this.billingAddressFormGroup.value);
    }

    onCheckboxClick() {
        this.isBillingShippingAddressSame = !this.isBillingShippingAddressSame;
    }

    private sendCreateAccountHttpRequest() {
        let addresses: CreateAccountAddressModel[] = [];

        addresses.push(new CreateAccountAddressModel(
            this.billingAddressFormGroup.controls['postalCode'].value,
            this.billingAddressFormGroup.controls['state'].value,
            this.billingAddressFormGroup.controls['city'].value,
            this.billingAddressFormGroup.controls['street'].value,
            this.billingAddressFormGroup.controls['number'].value,
            this.billingAddressFormGroup.controls['district'].value,
            this.billingAddressFormGroup.controls['complement'].value,
            0
        ));

        addresses.push(new CreateAccountAddressModel(
            this.shippingAddressFormGroup.controls['postalCode'].value,
            this.shippingAddressFormGroup.controls['state'].value,
            this.shippingAddressFormGroup.controls['city'].value,
            this.shippingAddressFormGroup.controls['street'].value,
            this.shippingAddressFormGroup.controls['number'].value,
            this.shippingAddressFormGroup.controls['district'].value,
            this.shippingAddressFormGroup.controls['complement'].value,
            1
        ));

        const createAccountRequestBody = new CreateAccountRequestBodyModel(
            this.mainFormGroup.controls['name'].value,
            this.mainFormGroup.controls['email'].value,
            this.mainFormGroup.controls['password'].value,
            1,
            addresses
        );

        this.createAccountService.sendCreateAccountRequest(createAccountRequestBody);
    }

}
