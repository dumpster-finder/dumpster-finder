import Dumpster from "../models/Dumpster";

type Filter = (dumpster: Dumpster) => boolean;

export interface DumpsterFilter {
    rating?: [number, number];
    cleanliness?: [number, number];
    locked?: boolean;
    positiveStoreView?: [number, number];
    dumpsterTypes?: string[];
    storeTypes?: string[];
    categories?: string[];
}

/**
 * Filter out all dumpsters with a rating that is not in the given range
 * @param min
 * @param max
 */
const filterRating = ([min, max]: [number, number]) => (d: Dumpster) =>
    d.rating >= min && d.rating <= max;

/**
 * Filter out all dumpsters with a cleanliness that is not in the given range
 * @param min
 * @param max
 */
const filterCleanliness = ([min, max]: [number, number]) => (d: Dumpster) =>
    d.cleanliness >= min && d.cleanliness <= max;

/**
 * Filter out all locked or unlocked dumpsters
 * @param locked
 */
const filterLocked = (locked: boolean) => (d: Dumpster) => d.locked === locked;

/**
 * Filter out dumpsters by store's view on dumpster diving
 */
const filterStoreView = ([min, max]: [number, number]) => (d: Dumpster) =>
    d.positiveStoreViewOnDiving === null
        ? min <= 1 && max >= 1 // neutral allowed
        : d.positiveStoreViewOnDiving
        ? min <= 2 && max === 2 // positive allowed
        : min === 0 && max >= 0; // negative allowed

/**
 * Filter out all dumpsters that are not of any of the given types
 * O(n)
 * @param types The allowed types
 */
const filterDumpsterType = (types: string[]) => (d: Dumpster) =>
    types.includes(d.dumpsterType);

/**
 * Filter out all dumpsters that are not of any of the given types
 * O(n)
 * @param types The allowed types
 */
const filterStoreType = (types: string[]) => (d: Dumpster) =>
    types.includes(d.storeType);

/**
 * Filter out all dumpsters that do not contain the given categories
 * (this is O(n²) at the moment)
 * @param categories Wanted categories
 */
const filterCategories = (categories: string[]) => (d: Dumpster) =>
    categories.every(c => d.categories.includes(c));

/**
 * Apply a set of filters to a list of dumpsters
 * @param filter
 */
export const applyFilter = (filter: DumpsterFilter) => (
    dumpsters: Dumpster[],
) => {
    // Build list of filters
    const filters: Filter[] = [];
    if (filter.rating) filters.push(filterRating(filter.rating));
    if (filter.cleanliness) filters.push(filterCleanliness(filter.cleanliness));
    if (filter.dumpsterTypes)
        filters.push(filterDumpsterType(filter.dumpsterTypes));
    if (filter.storeTypes) filters.push(filterStoreType(filter.storeTypes));
    if (filter.categories) filters.push(filterCategories(filter.categories));
    if (filter.locked !== undefined) filters.push(filterLocked(filter.locked));
    if (filter.positiveStoreView)
        filters.push(filterStoreView(filter.positiveStoreView));

    // Then apply them
    return dumpsters.filter(d => filters.every(f => f(d)));
};
