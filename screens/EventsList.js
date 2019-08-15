import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default class EventsList extends React.Component {
  constructor() {
    super();

    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    this.setState({ events: this.props.navigation.getParam('events', [])});
  }

  deleteEvent = id => {
    let URL = 'https://event-scheduler-backend-44.herokuapp.com/api/delete';

    fetch(URL, {
      'method': 'DELETE',
      'headers': {
        'Content-Type': 'application/json',
        'event_id': id,
      }
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
          let events = this.state.events;
          events = events.filter(event => event.event_id != id);
          this.setState({ events });
        }
      }).catch( error => {
        alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={( { item } ) =>

            <View style={{ paddingTop: 25 }} key={item.event_id}>
              <Text>{item.title} - {item.month}/{item.day}/{item.year}</Text>
              <Button
                title="Delete Event"
                onPress={() => this.deleteEvent(item.event_id)}
              />
            </View>

          }
          keyExtractor={(item, index) => item.event_id.toString()}
        />
      </View>
    );
  }
}

EventsList.navigationOptions = {
  title: 'List of Events'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
