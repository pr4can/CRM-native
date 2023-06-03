import { ReportType } from "components/PrintBlock/PrintBlock";
import { EntityProductForAdvanced } from "types/models/EntityProduct";
import {
	AdvancedFinalRequestCategory,
	EntityProductCategory,
	FinalRequestCategory,
} from "types/models/EntityProductCategory";

export interface RequestItem {
	productId: number;
	quantity: number;
}

export interface GetClientPageContentResponse {
	clientName?: string;
	clientOrganization?: string;
	isRequestCompleted?: boolean;
	categories?: EntityProductCategory[];
}

export interface GetClientPageContentRequest {
	DeliveryDate: string;
}

export interface GetAdminRequestsByClientRequest {
	Date: string;
	UserId: string;
}

export interface GetAdminRequestsByClientResponse {
	clientRequests?: ClientRequest[];
}

export interface GetAdminRequestsByClientRequest {
	Date: string;
	UserId: string;
}

export interface GetAdminRequestsByClientResponse {
	clientRequests?: ClientRequest[];
}

export interface ClientRequest {
	clientId?: number;
	clientName?: string;
	clientOrganization?: string;
	isRequestCreated?: boolean;
	requestCreationDate?: string;
	requestDeliveryDate?: string;
}

export type ClientRequests = ClientRequest[];

export interface GetAdminPageContentResponse {
	requestCreationDate: number;
	clientRequests: ClientRequests;
}

export interface GetAdminPageContentRequest {
	Date: string;
}

export interface GetFinalRequestAdminPageContentResponse {
	creationDate: number;
	finalRequestCategories: FinalRequestCategory[];
}

export interface AdvancedRequestItem {
	clientId?: number;
	clientName?: string;
	clientOrganization?: string;
	product?: EntityProductForAdvanced;
	quantity?: number;
}

export interface GetAdvancedFinalRequestAdminPageContentResponse {
	advancedFinalRequestCategories: AdvancedFinalRequestCategory[] | null;
}

export interface PostSubmitClientRequestData {
	deliveryDate: number;
	requestItems: RequestItem[];
}

export interface PutUpdateClientRequestData extends PostSubmitClientRequestData {
	clientId: number;
}

export interface ReportElement {
	productId: number;
	totalQuantity: number;
}

export interface GetReportRequest {
	date: number;
	reportType: ReportType;
	reportElements: ReportElement[];
	provider?: string;
}

export interface GetExtendedReportRequest {
	Date: string;
	ReportType: ReportType;
	Provider?: string;
}
