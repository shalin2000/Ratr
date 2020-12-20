import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, 
        ScrollView, Image, Linking, TouchableOpacity } from "react-native";
import { FAB } from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import RNPickerSelect from 'react-native-picker-select';

class NYBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      NYBook: [],
      buyLink: [],
      Amazon: '',
      AppleBooks: '',
      BarnesandNoble: '',
      BooksAMillion: '',
      Bookshop: '',
      Indiebound: '',
      placeholder: 'Select option'
    };
    this.getBuyLinkurl = this.getBuyLinkurl.bind(this);
	}

	componentDidMount(){
		this.setState({
      NYBook: this.props.route.params.book,
      buyLink: this.props.route.params.book.buy_links
    });
    this.getBuyLinkurl(this.props.route.params.book.buy_links)
	}

  // gets the links and stores them into the state if there exist those buy links
  getBuyLinkurl(buyLink){
    var x;
    for (x = 0; x < buyLink.length; x++){
      if (buyLink[x].name === 'Amazon'){
        this.setState({Amazon: buyLink[x].url})
      }
      if (buyLink[x].name === 'Apple Books'){
        this.setState({AppleBooks: buyLink[x].url})
      }
      if (buyLink[x].name === 'Barnes and Noble'){
        this.setState({BarnesandNoble: buyLink[x].url})
      }
      if (buyLink[x].name === 'Books-A-Million'){
        this.setState({BooksAMillion: buyLink[x].url})
      }
      if (buyLink[x].name === 'Bookshop'){
        this.setState({Bookshop: buyLink[x].url})
      }
      if (buyLink[x].name === 'Indiebound'){
        this.setState({Indiebound: buyLink[x].url})
      }
    } 
  }

	render() {
		return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 30, marginLeft: 20, marginRight: 10}}>
              <Image source = {{uri:this.state.NYBook.book_image}} style = {styles.image} /> 
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.title}>{this.state.NYBook.title}</Text>
              <Text style={styles.author}>{this.state.NYBook.author}</Text>
              {this.state.NYBook.primary_isbn13 !== '' ? <Text style={styles.isbn}>ISBN 13: {this.state.NYBook.primary_isbn13}</Text> : null}
              {this.state.NYBook.primary_isbn10 !== '' ? <Text style={styles.isbn}>ISBN 10: {this.state.NYBook.primary_isbn10}</Text> : null}
            </View>
          </View>
                  
          {this.state.NYBook.description !== '' ? 
          <View>
            <Text style={styles.description}>
              Description
            </Text>
            <View style={{marginLeft: 20}}>
              <ReadMore 
              numberOfLines={5} 
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
                <Text style={styles.descriptionText}>
                  {this.state.NYBook.description}
                </Text>
              </ReadMore>
            </View>
          </View> : <Text style={styles.description}>No Description Avaliable</Text> }

          <View>
            <Text style={styles.description}>
              Buy Links
            </Text>
            <View style={{marginLeft: 12}}>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a Store   ▾',
                    value: null,
                }}
                onValueChange={(value) => value !== null ? Linking.openURL(value) : null}
                items={[
                    { label: 'Amazon', value: this.state.Amazon },
                    { label: 'Apple Books', value: this.state.AppleBooks },
                    { label: 'Barnes and Noble', value: this.state.BarnesandNoble },
                    { label: 'Books-A-Million', value: this.state.BooksAMillion },
                    { label: 'Bookshop', value: this.state.Bookshop },
                    { label: 'Indiebound', value: this.state.Indiebound },
                ]}
              />
            </View>
          </View>

        </ScrollView>

        <FAB
        style={styles.fab}
        small
        icon="plus"
        color="yellow"
        onPress={() => console.log('Pressed')}
        />

      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1, backgroundColor: '#1b1b1c',
  },
  image: {
    width: 140, height: 200, resizeMode: 'stretch'
  },
  title: {
    color: 'lightblue', fontSize: 28, flexWrap: 'wrap', width: 175
  },
	author: {
    color: '#ebe4d3', fontSize: 18, flexWrap: 'wrap', width: 175
  },
  isbn: {
    color: '#ebe4d3', fontSize: 12, marginTop: 5, flexWrap: 'wrap'
  },
	description: {
    color: 'lightblue', fontSize: 20, marginLeft:20, marginBottom: 15, marginTop: 20
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 15
  },
  fab: {
    position: 'absolute', margin: 16, right: 0, bottom: 0,
  },
});

export default NYBookScreen;