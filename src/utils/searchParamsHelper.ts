import { Search } from "types/router";

export interface BaseSearch extends Partial<Search> {
	[searchParams: string]: string | undefined;
}

export type SearchString = string;
type FilterFn<Search extends BaseSearch> = <Key extends keyof Search = keyof Search>(
	searchItem: [Key, Search[Key] | undefined],
	idx: number,
	search: Search
) => boolean;

interface SearchParamsHelper {
	parse: typeof parse;
	build: typeof build;
	filter: typeof filter;
}

/**
 * searchString to object
 **/
const parse = <Search extends BaseSearch>(searchString: SearchString, filterFn?: FilterFn<Search>): Search => {
	if (searchString === "") {
		return {} as Search;
	}

	const search = (searchString.startsWith("/") || searchString.startsWith("?") ? searchString.slice(1) : searchString)
		.split("&")
		.map((param) => param.split("=")) as [keyof Search, Search[keyof Search]][];

	return Object.fromEntries(
		filterFn
			? search.filter((param, idx) =>
					filterFn(param, idx, Object.fromEntries(search) as { [K in keyof Search]: Search[K] })
			  )
			: search
	) as { [K in keyof Search]: Search[K] };
};

/**
 * object to searchString
 **/
const build = <Search extends BaseSearch>(search: Search, filterFn?: FilterFn<Search>): SearchString => {
	const searchObj = Object.entries(search);

	return (
		filterFn
			? (searchObj as [keyof Search, Search[keyof Search]][]).filter((param, idx) => filterFn(param, idx, search))
			: searchObj
	)
		.map(([key, value]) => (value === undefined ? undefined : `${key.toString()}=${value}`))
		.filter((param) => !!param)
		.join("&");
};

const filter = <Search extends BaseSearch, SearchArg extends Search | SearchString>(
	searchOrString: SearchArg,
	filterFn: FilterFn<Search>
): SearchArg => {
	if (typeof searchOrString === "string") {
		return build(parse(searchOrString, filterFn)) as SearchArg;
	}

	if (typeof searchOrString === "object") {
		return parse(build(searchOrString, filterFn)) as SearchArg;
	}

	return searchOrString;
};

const searchParamsHelper: SearchParamsHelper = { parse, build, filter };
export default searchParamsHelper;
