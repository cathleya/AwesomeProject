'use strict';

import React, { Component } from 'react';
import { Text, NavigatorIOS, View, StyleSheet } from 'react-native';

import SearchBooks from './SearchBooks'

export default class Search extends Component {
  render() {
    return (
      <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Search Books',
            component: SearchBooks
        }}/> 
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  }

});
