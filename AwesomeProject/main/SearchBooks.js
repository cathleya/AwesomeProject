'use strict';

import React, { Component } from 'react';
import {Text,TextInput,Image,View,StyleSheet,ActivityIndicator,TouchableHighlight } from 'react-native';

import SearchResults from './SearchResults'

export default class SearchBooks extends Component {
		constructor(props){
		super(props);
		this.state={
			bookAuthor:'',
			bookTitle:'',
			isLoading:false,
			errorMessage:''
		};
	}

	bookTitleInput(e){
		this.setState({bookTitle:e.nativeEvent.text});
	}

	bookAuthorInput(e){
		this.setState({bookAuthor:e.nativeEvent.text});
	}

	searchBooks(){
		this.fetchData();
	}

	fetchData(){
		this.setState({isLoading:true});
		var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

		if (this.state.bookTitle !== '') {
			 baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
		}

		if (this.state.bookAuthor !== '') {
			baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
		}

		console.log('URL: >>> ' + baseURL);

		console.log('URL: >>> ' + 'hello');

		fetch(baseURL)
		.then((response)=>response.json())
		.then((responseData)=>{
			this.setState({isLoading:false});
			if (responseData.items) {
				
					this.props.navigator.push({
						title:'search result',
						component:SearchResults,
						passProps:{books:responseData.items}
					});

			}else {
				this.setState({errorMessage:'no result found'});
			}
		})
		.catch(error=>this.setState({isLoading:false,errorMessage:error}))
		.done();

	}

	render(){
		var spinner = this.state.isLoading?(<ActivityIndicator size='large'/>):(<View/>);
		return (<View style = {styles.container}>

			<Text style = {styles.instructions}>Search by book title or author</Text>
			<View>
				<Text style={styles.fieldLabel}>Book Title:</Text>
				<TextInput style={styles.searchInput} onChange={this.bookTitleInput.bind(this)}></TextInput>
			</View>

			<View>
				<Text style={styles.fieldLabel}>Book Author:</Text>
				<TextInput style={styles.searchInput} onChange={this.bookAuthorInput.bind(this)}></TextInput>
			</View>

			<TouchableHighlight onPress={() => this.searchBooks()}  underlayColor='#f1c40f' style={styles.button}>
				<Text style = {styles.buttonText}>Search</Text>
			</TouchableHighlight>
			{spinner}
			<Text style = {styles.errorMessage}>{this.state.errorMessage}</Text>
		</View>)
	}
}

var styles = StyleSheet.create({
	container:{
		marginTop:65,
		padding:10,
	},
	searchInput:{
		height:36,
		marginTop:10,
		marginBottom:10,
		fontSize:18,
		borderWidth:1,
		flex:1,
		borderRadius:4,
		padding:1
	},
	button:{
		height:36,
		backgroundColor:'#f39c12',
		borderRadius:8,
		justifyContent:'center',
		marginTop:15
	},
	buttonText:{
		fontSize:18,
		color:'white',
		alignSelf:'center'
	},
	instructions:{
		fontSize:18,
		alignSelf:'center',
		marginBottom:15
	},
	fieldLabel:{
		fontSize:15,
		marginTop:15
	},
	errorMessage:{
		fontSize:15,
		alignSelf:'center',
		color:'red',
		marginTop:15
	}
});
