export type Entry<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T];

/**
 * Filters an object by its entries
 * Explications :
 * - Object.entries(obj) returns an array of entries of the object
 * - Object.fromEntries(entries) returns an object from an array of entries
 *
 * @param obj
 * @param predicate
 * @returns
 */
export function filterObject<T extends object>(obj: T, predicate: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean): T {
	return Object.fromEntries(
		(Object.entries(obj) as Entry<T>[]).filter(predicate)
	) as T;
}
