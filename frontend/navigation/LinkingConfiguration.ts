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
            },
          },
          ListTab: {
            screens: {
              ListScreen: 'list',
              DetailsScreen: 'details',
              AddPositionScreen: 'addPos',
              AddInfoScreen: 'addInfo',
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
