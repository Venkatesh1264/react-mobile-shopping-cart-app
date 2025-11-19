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
    price_usd: number;
    image_url: string;
    specs: Specs;
    summaryImages: string[],
    rating: number
}