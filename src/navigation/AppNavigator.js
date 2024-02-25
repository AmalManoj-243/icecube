// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import TabBarIcon from '@components/TabBarIcon';
import { HomeScreen, CartScreen, CategoriesScreen, MyOrdersScreen, ProfileScreen } from '@screens';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabBarOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 10,
      right: 15,
      left: 15,
      borderRadius: 10,
      elevation: 0,
      height: 70,
      backgroundColor: '#2e294e', // Focused state background color
    }
  };

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconComponent={<Feather name="home" size={18} color={focused ? "#151718" : "#fff"} />} label="Home" />
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconComponent={<MaterialCommunityIcons name="view-dashboard-outline" size={18} color={focused ? "#151718" : "#fff"} />} label="Categories" />
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconComponent={<MaterialCommunityIcons name="cart-outline" size={18} color={focused ? "#151718" : "#fff"} />} label="Cart" />,
          // tabBarStyle: { display: 'none' }
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconComponent={<SimpleLineIcons name="handbag" size={18} color={focused ? "#151718" : "#fff"} />} label="Orders" />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconComponent={<FontAwesome name="user-o" size={18} color={focused ? "#151718" : "#fff"} />} label="Profile" />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
