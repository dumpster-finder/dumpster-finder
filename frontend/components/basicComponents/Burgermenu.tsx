import * as React from "react";
import { Layout, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { MenuIcon } from "./Icons";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { ImageProps } from "react-native";

export default function Burgermenu({
    onSelect,
    values,
    icons,
}: {
    onSelect: (newValue: number) => void;
    values: string[];
    icons?: RenderProp<Partial<ImageProps>>[];
}) {
    const [visible, setVisible] = useState(false);
    const onMenuPress = (i: number) => {
        setVisible(false);
        onSelect(i);
    };
    return (
        <Layout level="1">
            <OverflowMenu
                visible={visible}
                style={{ width: "75%" }}
                placement="left"
                anchor={() => (
                    <Button
                        appearance="ghost"
                        accessoryLeft={MenuIcon}
                        onPress={() => setVisible(true)}
                    />
                )}
                onBackdropPress={() => setVisible(false)}
            >
                {values.map((item, i) => (
                    <MenuItem
                        title={item}
                        key={i}
                        accessoryLeft={icons && icons[i]}
                        onPress={() => onMenuPress(i)}
                    />
                ))}
            </OverflowMenu>
        </Layout>
    );
}
