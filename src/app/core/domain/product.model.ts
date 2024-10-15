export class ProductModel {

    constructor(
        public title: string = '',
        public description: string = '',
        public manufacturer: string = '',
        public price: number = 0,
        public promotionalPrice: number = 0,
    ) {}

}
