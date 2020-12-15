import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from "axios";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameList: [],
      movieList: []
    };
    this.getMovieName = this.getMovieName.bind(this);
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies',
      params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
      headers: {
        'x-rapidapi-key': '4853f4d6f7msh004d9182b67480ap19bb01jsn8f40f5105e9a',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    };
    axios.request(options).then(res => {
      console.log(res.data);
      this.setState({ 
        nameList: res.data 
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  getMovieName(list){
    var x;
    var b = 0;
    var titleArr = [];
    for (x of list) {
      var val = x.split("/");
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
        params: {tconst: val[2], currentCountry: 'US'},
        headers: {
          'x-rapidapi-key': '4853f4d6f7msh004d9182b67480ap19bb01jsn8f40f5105e9a',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };
      axios.request(options).then(res => {
        titleArr.push(res.data.title.title)
      }).catch(function (error) {
        console.error(error);
      });
      if(b == 4){
        break;
      }
      b = b+1;
    }
    console.log(titleArr)
    // this.setState({ 
    //   movieList: titleArr
    // });
    
  }

  render() {
    return (
      <View>
        {this.getMovieName(this.state.nameList)}
        <Text>{this.props.movieList}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
