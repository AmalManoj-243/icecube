import React from 'react';
import { View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import THEME from '@constants/theme';
import Text from '@components/Text';
import CarouselPagination from '@components/Home/CarouselPagination';


const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.COLORS.appTheme }}>
      <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
          <Image source={require('@assets/images/Home/Header/header_transparent_bg.png')} style={{ width: width * 0.5, aspectRatio: 3 }} />
          <Image source={require('@assets/images/Home/Header/notification.gif')} style={{ width: width * 0.25, aspectRatio: 2 / 1, resizeMode: 'contain' }} />
        </View>
        {/* Navigation Header */}
        <View style={{ backgroundColor: '#2e294e', padding: 10, marginHorizontal: 20, borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchProducts')}>
            <Image source={require('@assets/images/Home/Header/search.png')} style={{ width: 20, height: 20 }} tintColor="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Options')}>
            <Text style={{ color: 'white', fontFamily: THEME.FONT_FAMILY.urbanistLight }}>What are you looking for ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <Image source={require('@assets/images/Home/Header/barcode_scanner.png')} style={{ width: 20, height: 20 }} tintColor="white" />
          </TouchableOpacity>
        </View>
        {/* Carousel */}
        <CarouselPagination/>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
