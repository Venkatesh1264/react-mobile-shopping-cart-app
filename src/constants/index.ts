export interface Specs {
    display: string,
    processor: string,
    ram: string,
    storage: string[],
    camera: string
}

export interface MobileData  {
    id: string;
    brand: string;
    name: string;
    offer_price: number;
    image_url: string;
    specs: Specs;
    summaryImages: string[],
    rating: number,
    old_price: number;
}