// PageHeader.js
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import THEME from '@constants/theme';
import Text from '@components/Text';

const PageHeader = ({ title }) => {
    const iconSource = require('@assets/images/Home/pageHeader/page_header_transparent_bg.png');

    // Get the screen width
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ backgroundColor: THEME.COLORS.white, paddingBottom: 10, paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#362D2D', fontSize: 20, fontFamily: THEME.FONT_FAMILY.urbanistBold }}>{title}</Text>
            <Image source={iconSource} style={{ width: screenWidth * 0.25, height: '100%' }} />
        </View>
    );
};

export default PageHeader;
