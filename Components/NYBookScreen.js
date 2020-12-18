import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, 
        ScrollView, Image, Linking, TouchableOpacity } from "react-native";
// import { TouchableRipple } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FAB } from 'react-native-paper';

class NYBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      NYBook: [],
      buyLink: []
    };
	}

	componentDidMount(){
		this.setState({
      NYBook: this.props.route.params.book,
      buyLink: this.props.route.params.book.buy_links
		});
	}

	// Stores all results found from google api when user searched a specifc title
	// storeAllBooks(books){
		
	// }

  // openLink(link){
  //   Linking.openURL(link);
  // }

	render() {

    // const displayBuyLinks = () =>
    //   {var x
    //   for (x of this.state.buyLink){
    //     if (x.name === 'Amazon'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/amazon.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //     if (x.name === 'Apple Books'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/applebook.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //     if (x.name === 'Barnes and Noble'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/Barnes&Noble.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //     if (x.name === 'Books-A-Million'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/bookAMillion.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //     if (x.name === 'Bookshop'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/bookshop.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //     if (x.name === 'Indiebound'){
    //       <TouchableOpacity onPress={this.openLink(x.url)}>
    //         <Image source={require('../Images/indieBound.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
    //       </TouchableOpacity>
    //     }
    //   }
    //   }

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
        
        <Text style={styles.descriptionText}><Text style={styles.boldAndUnderline}>Buy Links:</Text> {this.state.buyLink.map((link, index) => (
          <Text key={index}> 
            {link.name === 'Amazon' ?
              <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                <Image source={require('../Images/amazon.jpg')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
              </TouchableOpacity> : 
            link.name === 'Apple Books' ?
              <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                <Image source={require('../Images/applebook.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
              </TouchableOpacity> : 
            link.name === 'Barnes and Noble' ?
            <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
              <Image source={require('../Images/barnes.jpg')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
            </TouchableOpacity> :
            link.name === 'Books-A-Million' ?
            <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
              <Image source={require('../Images/bookAMillion.png')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
            </TouchableOpacity> :
            link.name === 'Bookshop' ?
            <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
              <Image source={require('../Images/bookshop.jpg')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
            </TouchableOpacity> :
            link.name === 'Indiebound' ?
            <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
              <Image source={require('../Images/indieBound.jpg')} style={{width: 100, height: 100, resizeMode: 'contain',}} />
            </TouchableOpacity> : null
            }
          </Text>
          ))} 
        </Text>
        
        {/* <FontAwesomeIcon icon={ faBookmark } color="blue" size={ 64 }/> */}

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