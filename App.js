/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform,FlatList,StyleSheet, Text, View,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render(){
    return <AppContainer/>;
  }
}

class HomeScreen extends React.Component {
  state = {
    listData:[]
  };

  componentDidMount(){
    this.initData()
  }
  initData(){
      for(var i = 0;i<30;i++){
        this.state.listData.push("item##222"+i)
      }
      this.setState({
        listData:this.state.listData
      })
  }
  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.listData}
        renderItem={(item,index) => this.renders(item,index)}
      />
    </View>
    );
  }

  renders({item,index}){
  
    return <TouchableWithoutFeedback onPress={() => this.props.navigation.push('Detail',{
      itemId:item,
    })}><Text style={styles.item}>{item}</Text></TouchableWithoutFeedback>
   }
}


class Me extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "ME",
    };
  }
  render() {
    return (
      <View>
       <Text>this is me page</Text>
    </View>
    );
  }

}


class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('itemId', 'NO-ID'),
    };
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Detail')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

        <Text>content: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}</Text>
      </View>
    );
  }
}



const MeNavigator = createStackNavigator(
   {
    Me: Me,
  },
  {
    // initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle:"ME"
    },
  });

  const HomeNavigator = createStackNavigator(
    {
     Home: HomeScreen,
     Detail: DetailsScreen,
   },
   {
     initialRouteName: 'Home',
     defaultNavigationOptions: {
       headerStyle: {
         backgroundColor: '#f4511e',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerTitle:"home"
     },
   });


   const HomeTabNavigator = createBottomTabNavigator({
    // Home: HomeScreen,
    // Me: Me,
    Home:HomeNavigator,
    Me:MeNavigator
  },{
    initialRouteName: 'Home',
    defaultNavigationOptions:({navigation}) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Me') {
          iconName = `md-contact`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    })
      // headerTitle:"ME"
    }
    )

  HomeTabNavigator.navigationOptions = ({navigation}) =>{
    if(navigation.state.index == 0){
      return{
        headerTitle:"Home"
      }
    }else{
     return {
       headerTitle:"Me"
      }
    }
  }
 const AppContainer = createAppContainer(HomeTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
});
