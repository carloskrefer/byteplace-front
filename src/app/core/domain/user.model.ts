export class UserModel {
    id: number | undefined;
    name: string;

    billingAddress: AddressModel | undefined;
    shippingAddress: AddressModel | undefined;

    constructor() {
        this.name = '';
    }
}

export class AddressModel {
    id: number | undefined;
    postalCode: string;
    state: string;
    city: string;
    street: string;
    number: string;
    district: string;

    constructor() {
        this.postalCode = '';
        this.state = '';
        this.city = '';
        this.street = '';
        this.number = '';
        this.district = '';
    }
}
