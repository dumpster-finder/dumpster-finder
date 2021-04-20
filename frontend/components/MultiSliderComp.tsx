import * as React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default function MultiSliderComp({
    values,
    max,
    labels,
    onChange,
}: {
    values: number[];
    max: number;
    labels: any[];
    onChange: (value: number[]) => void;
}) {
    return (
        <MultiSlider
            values={values}
            max={max}
            stepsAs={labels}
            smoothSnapped={true}
            showSteps={true}
            showStepLabels={true}
            allowOverlap={true}
            onValuesChange={val => onChange(val)}
        />
    );
}
