import * as React from "react";
import { Layout, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { MenuIcon } from "./Icons";

export default function Burgermenu({
    onSelect,
    values,
}: {
    onSelect: (newValue: number) => void;
    values: string[];
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
                        onPress={() => onMenuPress(i)}
                    />
                ))}
            </OverflowMenu>
        </Layout>
    );
}
