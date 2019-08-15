import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SaveEventForm from '../components/SaveEventForm';

export default class SaveEvent extends React.Component {
  // render tab bar icon for bottom nav
  static navigationOptions = {
    tabBarIcon: TabBarIcon('note-add')
  };

  saveEvent = (title, day, month, year, notes) => {
    let URL = 'https://event-scheduler-backend-44.herokuapp.com/api/save';

    fetch(URL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'title': title,
        'year': year,
        'month': month,
        'day': day,
        'notes': notes,
      }
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.success);
        }
      }).catch( error => {
        alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          enabled
        >
          <ScrollView style={{ paddingTop: 20 }}>
            <Text style={styles.large_info}>
              Fill out the fields below to save an event.
            </Text>
            <Text style={styles.small_info}>*** All fields are required. ***</Text>

            <SaveEventForm saveEvent={this.saveEvent} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

//SaveEvent.navigationOptions = {
//  title: 'Save Event'
//};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  large_info: {
    fontSize: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'center',
  },
  small_info: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
