import * as React from "react";
import { Layout, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { MenuIcon } from "./Icons";

export default function Burgermenu({
    value,
    onChange,
}: {
    value: string;
    onChange: (newValue: string) => void;
}) {
    const [visible, setVisible] = useState(false);
    const menuItems = [
        "Flag dumpster",
        "Revision history",
        "Edit dumpster",
        "Edit content",
    ];
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
                    <MenuItem title={item} key={i} onPress={() => onChange(item)}/>
                ))}
            </OverflowMenu>
        </Layout>
    );
}
