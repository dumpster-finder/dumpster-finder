import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          MapTab: {
            screens: {
              MapScreen: 'map',
              DetailsScreen: 'details',
              AddPositionScreen: 'addPos',
              AddInfoScreen: 'addInfo',
              CommentScreen: 'comments',
              ContentScreen: "contents",
            },
          },
          ListTab: {
            screens: {
              ListScreen: 'list',
              DetailsScreen: 'details',
              AddPositionScreen: 'addPos',
              AddInfoScreen: 'addInfo',
              CommentScreen: 'comments',
              ContentScreen: "contents",
            },
          },
          InfoTab: {
            screens: {
              InfoScreen: 'info',
            },
          },
          SettingsTab: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
