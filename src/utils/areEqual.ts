type AreEqual<T> = (a: T, b: T) => boolean;

const areEqualObjects: AreEqual<object> = (a, b) => {
	if (Object.keys(a).length !== Object.keys(b).length) {
		return false;
	}

	return Object.keys(a).every(
		(key) => b.hasOwnProperty(key) && areEqual(a[key as keyof typeof a], b[key as keyof typeof b])
	);
};

const areEqualArrays: AreEqual<any[]> = (a, b) => {
	if (a.length !== b.length) {
		return false;
	}

	return (
		a.every((aItem) => !!b.find((bItem) => areEqual(aItem, bItem))) &&
		b.every((bItem) => !!a.find((aItem) => areEqual(aItem, bItem)))
	);
};

const areEqual: AreEqual<unknown> = (a, b) => {
	if (
		typeof a === "boolean" ||
		typeof a === "string" ||
		typeof a === "number" ||
		typeof a === "undefined" ||
		a === null ||
		b === null
	) {
		return a === b;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		return areEqualArrays(a, b);
	}

	if (typeof a === "object" && typeof b === "object") {
		return areEqualObjects(a, b);
	}

	return false;
};

export default areEqual;
