import moment from "moment";

type CompareItem = boolean | string | number | moment.Moment;
type CompareFn<T> = (a: T, b: T) => number;

const numericFn: CompareFn<number> = (a, b) => {
    return a - b;
};

const lexicographicFn: CompareFn<string> = (a, b) => {
    return a.localeCompare(b);
};

const booleanFn: CompareFn<boolean> = (a, b) => {
    return Number(a) - Number(b);
};

const momentDateFn: CompareFn<moment.Moment | string> = (a, b) => {
    const dateA = moment(a);
    const dateB = moment(b);

    if (dateA.isValid() && dateB.isValid()) {
        return dateA.diff(dateB);
    }

    return 0;
};

const sorterDecorator = <T extends CompareItem>(
    a: T | null | undefined,
    b: T | null | undefined,
    comparator: CompareFn<T>
) => {
    if (a == null) {
        return -1;
    }

    if (b == null) {
        return 1;
    }

    return comparator(a, b);
};

const numeric = (a?: number | null, b?: number | null) => sorterDecorator<number>(a, b, numericFn);

const lexicographic = (a?: string | null, b?: string | null) => sorterDecorator<string>(a, b, lexicographicFn);

const boolean = (a?: boolean | null, b?: boolean | null) => sorterDecorator<boolean>(a, b, booleanFn);

const byMomentDate = (a?: moment.Moment | null | string, b?: moment.Moment | null | string) =>
    sorterDecorator<moment.Moment | string>(a, b, momentDateFn);

export const sorter = { numeric, lexicographic, boolean, byMomentDate };
