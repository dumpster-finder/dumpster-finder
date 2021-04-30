import * as React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useTheme } from "@ui-kitten/components";

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
    const theme = useTheme();
    return (
        <MultiSlider
            selectedStyle={{ backgroundColor: theme["color-primary-active"] }}
            unselectedStyle={{ backgroundColor: theme["color-basic-default"] }}
            stepMarkerStyle={{ backgroundColor: theme["color-basic-default"] }}
            markerStyle={{ backgroundColor: theme["color-primary-active"] }}
            // @ts-ignore (stepLabelStyle allows standard text props)
            stepLabelStyle={{ color: theme["text-basic-color"] }}
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
