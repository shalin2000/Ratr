import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, 
        ScrollView, Image, Linking, TouchableOpacity } from "react-native";
// import { TouchableRipple } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FAB } from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

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
			<ScrollView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source = {{uri:this.state.NYBook.book_image}} style = {styles.image} /> 
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>{this.state.NYBook.title}</Text>
              <Text style={styles.text}><Text style={styles.boldAndUnderline}>WRITTEN BY:</Text> {this.state.NYBook.author}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.descriptionText}><Text style={styles.boldAndUnderline}>Description:</Text> {this.state.NYBook.description}</Text>
        
        {this.state.NYBook.primary_isbn13 !== null ? <Text style={styles.descriptionText}><Text style={styles.boldAndUnderline}>Primary ISBN 13:</Text> {this.state.NYBook.primary_isbn13}</Text> : null}
        {this.state.NYBook.primary_isbn10 !== null ? <Text style={styles.descriptionText}><Text style={styles.boldAndUnderline}>Primary ISBN 10:</Text> {this.state.NYBook.primary_isbn10}</Text> : null}
       
       {/* <DropDownPicker
            style={{width: 150, }}
            items = {[
              {label: 'Amazon', value: this.state.Amazon},
              {label: 'Apple Books', value: this.state.AppleBooks},
              {label: 'Barnes and Noble', value: this.state.BarnesandNoble},
              {label: 'Books-A-Million', value: this.state.BooksAMillion},
              {label: 'Bookshop', value: this.state.Bookshop},
              {label: 'Indiebound', value: this.state.Indiebound},
            ]} 
        
            defaultIndex={0}
            containerStyle={{width: 150, height: 40}}
            onChangeItem={item => 
              Linking.openURL(item.value)
            }
        /> */}

        <Picker
          selectedValue={<Text>Select</Text>}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            Linking.openURL(itemValue)
          }>
          <Picker.Item label= "Select" value = {null} />
          <Picker.Item label= "Amazon" value = {this.state.Amazon} />
          <Picker.Item label= "Apple Books" value = {this.state.AppleBooks} />
          <Picker.Item label= "Barnes and Noble" value = {this.state.BarnesandNoble} />
          <Picker.Item label= "Books-A-Million" value = {this.state.BooksAMillion} />
          <Picker.Item label= "Bookshop" value = {this.state.Bookshop} />
          <Picker.Item label= "Indiebound" value = {this.state.Indiebound} />

        </Picker>

        <FAB
          style={styles.fab}
          small
          icon="plus"
          color="yellow"
          onPress={() => console.log('Pressed')}
        />

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1, backgroundColor: '#1b1b1c',
  },
  image: {
    width: 200, height: 200, resizeMode: 'contain', marginTop: 50
  },
	text: {
    color: '#ebe4d3', fontSize: 20, marginTop: 50, flexWrap: 'wrap',
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 20, marginTop: 50, flexWrap: 'wrap', marginLeft: 10
  },
  boldAndUnderline: {
    fontWeight: 'bold', textDecorationLine: 'underline'
  },
  fab: {
    position: 'absolute', margin: 16, right: 0, bottom: 0,
  },
});

export default NYBookScreen;