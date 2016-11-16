'use strict';

import React, { Component } from 'react';
import { Text, View, StyleSheet, NavigatorIOS } from 'react-native';

import BookList from './BookList'


export default class Featured extends Component {
  render() {
    return (
       <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Featured Books',
            component: BookList
            }}/> 
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }

});
