export class ProductModel {
    id: number | undefined;
    title: string;
    price: number;
    promotionalPrice: number;
    description: string;

    images: ImageModel[];
    ratings: RatingModel[];
    stocks: StockModel[];

    constructor() {
        this.title = '';
        this.price = 0;
        this.promotionalPrice = 0;
        this.description = '';
        this.images = [];
        this.ratings = [];
        this.stocks = [];
    }

}

export class ImageModel {
    id: number | undefined;
    image: Blob | undefined;
    alternativeText: string;

    constructor() {
        this.alternativeText = '';
    }
}

export class RatingModel {
    id: number | undefined;
    rating: number;
    comment: string;

    constructor() {
        this.rating = 0;
        this.comment = '';
    }
}

export class StockModel {
    id: number | undefined;
}
