import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    MapTab: {
                        screens: {
                            MapScreen: "map",
                            DetailsScreen: "details",
                            AddPositionScreen: "addPos",
                            AddInfoScreen: "addInfo",
                            CommentScreen: "comments",
                            ContentScreen: "contents",
                            EditContentScreen: "EditCont",
                            EditDumpsterScreen: "EditDumpster",
                            RevisionScreen: "Revision",
                        },
                    },
                    ListTab: {
                        screens: {
                            ListScreen: "list",
                            DetailsScreen: "details",
                            AddPositionScreen: "addPos",
                            AddInfoScreen: "addInfo",
                            CommentScreen: "comments",
                            ContentScreen: "contents",
                            EditContentScreen: "EditCont",
                            EditDumpsterScreen: "EditDumpster",
                            RevisionScreen: "Revision",
                        },
                    },
                    InfoTab: {
                        screens: {
                            InfoScreen: "info",
                        },
                    },
                    SettingsTab: {
                        screens: {
                            SettingsScreen: "settings",
                            SetPositionScreen: "setPos",
                        },
                    },
                },
            },
            IntroScreen: "intro",
            IntroPositionScreen: "introPos",
            NotFound: "*",
        },
    },
};
