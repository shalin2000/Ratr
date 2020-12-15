import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from "react-native";

const Separator = () => (
  <View style={styles.separator} />
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <Text style = {styles.title}> 
      Ratr
    </Text>
    <Text style = {styles.secondary} >
      Rate. Track. Enjoy.
    </Text>
    <View>
      <Button
        title="Login"
        onPress={() => Alert.alert('Button pressed')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Continue as Guest"
        color="#f194ff"
        onPress={() => Alert.alert('Color button pressed')}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold', 
    fontStyle: 'italic', 
    color: 'black',
    textAlign: 'center',
  },
  secondary: {
    textAlign: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
