import {StyleProp, TextStyle} from "react-native";

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module 'react-native-elements' {
    export interface TextProps {
        p1Style?: StyleProp<TextStyle>;
    }

    export interface Colors {
        background: string;
        border: string;
        text: string;
        altText: string;
        danger: string;
    }

    export interface FullTheme {
        colors: RecursivePartial<Colors>;
        Text: Partial<TextProps>;
    }
}
