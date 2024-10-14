export class CreateAccountRequestBodyModel {

    constructor(
        public name: string = '',
        public email: string = '',
        public password: string = '',
        public role: number = 0,
        public addresses: CreateAccountAddressModel[] = []
    ) {}

}

export class CreateAccountAddressModel {

    constructor(
        public postalCode: string = '',
        public state: string = '',
        public city: string = '',
        public street: string = '',
        public number: string = '',
        public district: string = '',
        public complement: string = '',
        public addressType: number = 1
    ) {}

}
