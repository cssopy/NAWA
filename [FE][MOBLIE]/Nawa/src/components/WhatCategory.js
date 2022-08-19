import React from "react"
import { View } from "react-native"
import { Icon } from "@rneui/themed";
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';



const checkList = ['헬스', '배드민턴', '러닝', '애견산책', '산책', '등산', '자전거', '수영', '볼링', '당구', '농구', '풋살']

const WhatCategory = (item, idx) => {
        if (item === '헬스' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='barbell'
            type='ionicon'
            color='#f50'
            />
            </View>
          )
        } 
        else if (item === '배드민턴' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='badminton'
            type='material-community'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '러닝' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='directions-run'
            type='material'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '애견산책' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='guide-dog'
            type='foundation'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '산책' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='directions-walk'
            type='material'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '등산' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='mountains'
            type='foundation'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '자전거' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='bicycle'
            type='ionicon'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '수영' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='swim'
            type='material-community'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '볼링' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='bowling'
            type='material-community'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '당구' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='baseball-bat'
            type='material-community'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '농구' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='basketball'
            type='material-community'
            color='#f50'
            />
            </View>
          )
        }
        else if (item === '풋살' ) {
          return ( 
            <View key={idx} style={{flexDirection:"column"}}>
            <Icon
            raised
            size={15}
            iconStyle={{fontSize:25}}
            name='football'
            type='ionicon'
            color='#f50'
            />
            </View>
          )
        }
      }

      export default WhatCategory;