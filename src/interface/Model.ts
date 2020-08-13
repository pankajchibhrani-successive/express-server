//Model Type For DAO manager
export type ModelNames =
    'users' 
declare interface Pagination {
    limit?: number;
    page_no?: number;
}

declare interface ListingRequest extends Pagination {
    page_no?: number;
    name?: string;
    sort_criteria?: string;
    sort_by?: number;
    status?: string;
    fromDate?: number;
    toDate?: number;
    sort_by_key?: string;
    sort_order_key?: number | string;
    type?: string;
}

declare interface Location {
    address: string;
    type?: string;
    coordinates: number[];
}

declare interface BusinessId {
    business_id: string;
}