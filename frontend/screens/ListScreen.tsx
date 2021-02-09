import * as React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ListCards from '../components/ListCards'

export default function ListScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <ListCards/>
      <ListCards/>
      <ListCards/>
      <ListCards/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ListScreen.tsx" />
    </ScrollView>
  );
}

// jesus, dette kan trekkes ut i noe eget, kanskje
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
