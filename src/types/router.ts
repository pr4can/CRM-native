export type Params = {};

export const enum SearchParams {
	ReturnUrl = "returnUrl",
}

export interface Search {
	[SearchParams.ReturnUrl]?: string;
}
