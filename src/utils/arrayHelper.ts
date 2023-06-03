import { Key } from "react";

const castFromItem = <T>(item?: T | T[]): T[] => {
	if (item === undefined) {
		return [];
	}

	return Array.isArray(item) ? item : [item];
};

const filterNullable = <T>(x: T | undefined | null): x is T => {
	return x !== undefined && x !== null;
};

type FlattenArgItem<T> = { id?: Key; children?: T[] | null };

/*
 * Function for transforming `tree` `list` to parented `flatten` `list` without children <br />
 * If `parentKey = undefined` then `flatten` `list` will not have a parent
 * */
const flatten = <T extends FlattenArgItem<T>, P extends object = T>(
	children: T[],
	mapCallback: (value: T, index: number, array: T[]) => P = ({ children, ...x }) => x as P,
	parentKey: keyof T | null = "id",
	parent: any = null
): P[] =>
	Array.prototype.concat.apply(
		children
			.map(({ ...x }) => ({
				...x,
				parent,
			}))
			.map(mapCallback),
		children.map((x) =>
			flatten(extractChildren(x) || [], mapCallback, parentKey, parentKey === null ? undefined : x[parentKey])
		)
	);

const extractChildren = <T extends FlattenArgItem<T>>(x: T): T[] => x.children ?? [];

const arrayHelper = { castFromItem, filterNullable, flatten, extractChildren };
export default arrayHelper;
