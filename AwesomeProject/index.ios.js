/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * http://www.appcoda.com/react-native-introduction/
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, TabBarIOS, Navigator, Text, View } from 'react-native'

import Featured from './main/Featured'
import Search from './main/Search'


class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    title="Featured"
                    //icon={{uri:'featured'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
                    //icon={{uri:'search'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
