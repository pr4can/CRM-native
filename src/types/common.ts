import { Location as ILocation } from "@remix-run/router/history";

export type Enum<E> = Record<keyof E, number | string> & { readonly [k: number]: string };

export interface Location<State = any> extends Omit<ILocation, "state"> {
	state?: State | null;
}

export type KeysToLowercase<O extends object | undefined> = O extends object
	? { [K in Extract<keyof O, string> as Lowercase<K>]: O[K] }
	: undefined;

export type NonNullableFields<T, Keys extends keyof T = keyof T> = {
	[K in Keys]-?: NonNullable<T[K]> extends object
		? NonNullableFields<NonNullable<T[K]>, keyof NonNullable<T[K]>>
		: NonNullable<T[K]>;
};
