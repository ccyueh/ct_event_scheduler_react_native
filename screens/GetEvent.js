import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import GetEventsForm from '../components/GetEventsForm.js'

export default class GetEvent extends React.Component {
  // call api here; send events to event list
  getEvents = (day, month, year) => {
    let URL = 'https://event-scheduler-backend-44.herokuapp.com/api/retrieve';

    fetch(URL, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'year': year,
        'month': month,
        'day': day
      }
    }).then(response => response.json())
      .then(data => {
        if (data.events) {
          this.props.navigation.navigate('EventsList', { 'events': data.events });
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
              Fill out the fields below to retrieve events for a given time frame.
            </Text>
            <Text style={styles.small_info}>*** Year is required. ***</Text>

            <GetEventsForm getEvents={this.getEvents} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

GetEvent.navigationOptions = {
  title: 'Get Events'
};

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
