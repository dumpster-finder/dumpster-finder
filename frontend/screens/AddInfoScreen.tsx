import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Input,
    IndexPath,
    Select,
    SelectItem,
} from "@ui-kitten/components";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
    editorPositionSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import {
    CleanIcon,
    FadedCleanIcon,
    LockIcon,
    PositiveIcon,
    TrashIcon,
} from "../components/Icons";
import { ButtonGroup } from "../components/ButtonGroup";
import {DumpsterService} from "../services";
import Rating from "../components/Rating";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(editorPositionSelector);
    const dumpsterTypes = ["Metal", "Compressor", "Plastic"];
    const storeTypes = ["Food", "Electronics"];
    const categories = ["Meat", "Fruit", "Vegetables", "Spices"];
    const cleanlinessRange = [
        "Filthy",
        "Dirty",
        "Average",
        "Clean",
        "Pristine",
    ];

    const [name, setName] = useState("");
    const [dumpsterTypeIndex, setDumpsterTypeIndex] = useState(
        new IndexPath(0),
    );
    const [storeTypeIndex, setStoreTypeIndex] = useState(new IndexPath(0));
    const [emptyingSchedule, setEmptyingSchedule] = useState("");
    const [cleanliness, setCleanliness] = useState(3);
    const [locked, setLocked] = useState(false);
    const [
        categorySelectedIndex,
        setCategoryMultiSelectedIndex,
    ] = React.useState([new IndexPath(0)]);
    const [positiveStoreViewOnDiving, setIsPositive] = useState(1);

    return (
        <Layout>
            <ScrollView scrollEnabled style={styles.fullWidth} contentContainerStyle={styles.container}>
                <Input
                    style={{ width: "80%" }}
                    placeholder="Name"
                    label="Store name"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <View style={styles.row}>
                    <Select
                        label="Dumpster type"
                        selectedIndex={dumpsterTypeIndex}
                        value={dumpsterTypes[dumpsterTypeIndex.row]}
                        onSelect={index =>
                            index instanceof IndexPath &&
                            setDumpsterTypeIndex(index)
                        }
                        style={{ width: "48%", margin: "2%" }}
                    >
                        {dumpsterTypes.map((type, i) => (
                            <SelectItem key={i} title={type} />
                        ))}
                    </Select>
                    <Select
                        label="Store type"
                        selectedIndex={storeTypeIndex}
                        value={storeTypes[storeTypeIndex.row]}
                        onSelect={index =>
                            index instanceof IndexPath &&
                            setStoreTypeIndex(index)
                        }
                        style={{ width: "48%", margin: "2%" }}
                    >
                        {storeTypes.map((type, i) => (
                            <SelectItem key={i} title={type} />
                        ))}
                    </Select>
                </View>
                <Select
                    label="Categories"
                    style={{ width: "80%" }}
                    multiSelect={true}
                    placeholder="Categories"
                    value={showCategories()}
                    selectedIndex={categorySelectedIndex}
                    onSelect={index =>
                        Array.isArray(index) &&
                        setCategoryMultiSelectedIndex(index)
                    }
                >
                    {categories.map((type, i) => (
                        <SelectItem key={i} title={type} />
                    ))}
                </Select>
                <View style={styles.row}>
                    <View style={styles.icon}>
                        <PositiveIcon size="medium" />
                    </View>
                    <ButtonGroup
                        style={styles.nextToIcon}
                        appearance="outline"
                        status="basic"
                    >
                        <Button
                            style={{ width: "33.3%", paddingHorizontal: 5 }}
                            onPress={() => setIsPositive(0)}
                            appearance={
                                positiveStoreViewOnDiving === 0
                                    ? "filled"
                                    : "outline"
                            }
                        >
                            Negative
                        </Button>
                        <Button
                            style={{ width: "33.3%", paddingHorizontal: 5 }}
                            onPress={() => setIsPositive(1)}
                            appearance={
                                positiveStoreViewOnDiving === 1
                                    ? "filled"
                                    : "outline"
                            }
                        >
                            Neutral
                        </Button>
                        <Button
                            style={{ width: "33.3%", paddingHorizontal: 5 }}
                            onPress={() => setIsPositive(2)}
                            appearance={
                                positiveStoreViewOnDiving === 2
                                    ? "filled"
                                    : "outline"
                            }
                        >
                            Positive
                        </Button>
                    </ButtonGroup>
                </View>

                <View style={styles.row}>
                    <View style={styles.icon}>
                        <LockIcon size="medium" />
                    </View>

                    <ButtonGroup
                        style={styles.nextToIcon}
                        appearance="outline"
                        status="basic"
                    >
                        <Button
                            style={{ width: "50%" }}
                            onPress={() => setLocked(true)}
                            appearance={locked ? "filled" : "outline"}
                        >
                            Locked
                        </Button>
                        <Button
                            style={{ width: "50%" }}
                            onPress={() => setLocked(false)}
                            appearance={!locked ? "filled" : "outline"}
                        >
                            Open
                        </Button>
                    </ButtonGroup>
                </View>

                <View style={styles.row}>
                    <View style={styles.icon}>
                        <TrashIcon size="medium" />
                    </View>
                    <Input
                        style={styles.nextToIcon}
                        placeholder="Emptied at times..."
                        onChangeText={text => setEmptyingSchedule(text)}
                        value={emptyingSchedule}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.icon}>
                        <TrashIcon size="medium" />
                    </View>
                    <Rating/>
                </View>


                <View style={styles.row}>
                    <Button
                        appearance="outline"
                        status="primary"
                        style={{ width: " 48%", margin: "2%" }}
                        onPress={() => console.log("photo")}
                    >
                        Add photo
                    </Button>
                    <Button
                        status="primary"
                        style={{ width: " 48%", margin: "2%" }}
                        onPress={handleSubmit}
                    >
                        Save
                    </Button>
                </View>
            </ScrollView>
        </Layout>
    );

    function showCategories() {
        return categorySelectedIndex
            .map(({ row }) => categories[row])
            .join(", ");
    }

    function handleSubmit() {
        if(name != ""){
            let positiveView = null;
            if (positiveStoreViewOnDiving === 0) {
                positiveView = false;
            } else if (positiveStoreViewOnDiving === 2) {
                positiveView = true;
            }
            // Post the dumpster, add it to the list of dumpster if that succeeds
            // TODO: actually make the above happen
            //       it is now substituted with this:
            // (rating is omitted because it is calculated later, idk what the backend will do rn)
            const dumpster: Omit<Dumpster, "dumpsterID" | "rating"> = {
                name,
                position,
                dumpsterType: dumpsterTypes[dumpsterTypeIndex.row],
                storeType: storeTypes[storeTypeIndex.row],
                emptyingSchedule,
                cleanliness,
                positiveStoreViewOnDiving: positiveView,
                locked,
            };
            DumpsterService.addDumpster(dumpster);
            //console.log(dumpster.positiveStoreViewOnDiving); // TODO: delete this afterwards
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());
        }else{
            console.log("Does not have name")
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    fullWidth: {
        width: "100%",
        minHeight: "100%",
    },
    icon: {
        width: "10%",
        marginHorizontal: 4,
    },
    row: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    nextToIcon: {
        width: "90%",
    },
});
