'use strict';

import React, { Component, PropTypes } from 'react';
import { Text,Image,View, StyleSheet,TouchableHighlight,ListView } from 'react-native';

import BookDetail from './BookDetail'

export default class SearchResults extends Component {

  constructor(props){
    super(props);
    var db = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
    this.state={
      dataSource:db.cloneWithRows(this.props.books)
    };
  }

  renderBooks(book){
    var imageURL = (typeof book.volumeInfo.imageLinks !== 'undefined')? book.volumeInfo.imageLinks.thumbnail:'';
    console.log('imageURL==>:'+imageURL);
    return (
      <TouchableHighlight onPress={()=>this.showBookDetail(book)}  underlayColor='#dddddd'>
        <View>
          <View style={styles.cellContainer}>
            <Image style={styles.thumbnail} source={{uri:imageURL}}/>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.author}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  showBookDetail(book){
    this.props.navigator.push({
      title:book.volumeInfo.title,
      component:BookDetail,
      passProps:{book}
    });
  }


  render() {
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderBooks.bind(this)}
        style = {styles.listView}
      />
    );
  }
}

const styles = StyleSheet.create({
  listView:{
    backgroundColor:'#F5FCFF'
  },
  separator:{
    height:1,
    backgroundColor:'#dddddd'
  },
  cellContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF',
    padding:10
  },
  thumbnail:{
    height:81,
    width:53,
    marginRight:10
  },
  rightContainer:{
    flex:1
  },
  title:{
    fontSize:20,
    marginBottom:8
  },
  author:{
    color:'#656565'
  },

});
