import * as React from "react";
import { Layout, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { MenuIcon } from "./Icons";

export default function Burgermenu({
    onSelect,
}: {
    onSelect: (newValue: number) => void;
}) {
    const [visible, setVisible] = useState(false);
    const menuItems = [
        "Flag dumpster",
        "Revision history",
        "Edit dumpster",
        "Edit content",
    ];
    const onMenuPress = (i: number) => {
        setVisible(false);
        onSelect(i)
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
                {menuItems.map((item, i) => (
                    <MenuItem title={item} key={i} onPress={() => onMenuPress(i)}/>
                ))}
            </OverflowMenu>
        </Layout>
    );
}
