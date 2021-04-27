import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dumpsterFilterSelector } from "../redux/slices/configSlice";
import {
    allDumpstersSelector,
    dumpsterMapSelector,
} from "../redux/slices/dumpsterSlice";
import { applyFilter } from "../utils/filter";

export default function useFilter() {
    const dumpsters = useSelector(allDumpstersSelector);
    const dumpsterMap = useSelector(dumpsterMapSelector);
    const [filteredDumpsters, setFilteredDumpsters] = useState(dumpsters);
    const filter = useSelector(dumpsterFilterSelector);

    useEffect(() => {
        setFilteredDumpsters(applyFilter(filter)(dumpsters));
        console.log("Applying filter...", filter);
    }, [filter, dumpsterMap]);

    return filteredDumpsters;
}
