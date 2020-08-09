export as namespace IApp;

export interface IRequest {
	[key: string]: any
}

export interface IResponse<T> {
	data?: T,
	type?: string
}

export interface Entity<T> {
	success?: boolean;
	data?: T;
	type?: string;
}

export interface DataKeys {
	[key: string]: any
}

export interface Dispatcher {
	statusCode: number;
	message: string;
	data?: DataKeys;
}

declare interface Device extends UserId {
	platform?: string;
	deviceId?: string;
	deviceToken?: string;
	remoteAddress?: string | any;
	timezone?: number;
	lang?: string;
}

declare interface UserId {
	userId?: string;
}

declare interface TokenData extends UserId, Device {
	email?: string;
	name?: string;
	userType?: string;
	created?: number;
	iat?: number;
	exp?: number;
	lastLogin?: number;
	salt?: string;
	hash?: string;
}

export interface PaginationResult {
	data: any[];
	total: number;
	pageNo: number;
	totalPage: number;
	nextHit: number;
	limit: number;
}