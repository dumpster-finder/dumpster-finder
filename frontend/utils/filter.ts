import Dumpster from "../models/Dumpster";

type Filter = (dumpster: Dumpster) => boolean;

export interface DumpsterFilter {
    rating?: [number, number];
    cleanliness?: [number, number];
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
    if (filter.categories) filters.push(filterCategories(filter.categories));

    // Then apply them
    return dumpsters.filter(d => filters.every(f => f(d)));
};
