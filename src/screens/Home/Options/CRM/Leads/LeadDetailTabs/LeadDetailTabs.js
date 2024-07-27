import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import Details from './Details';
import FollowUp from './FollowUp';
import { SafeAreaView } from '@components/containers';
import { NavigationHeader } from '@components/Header';
import { COLORS, FONT_FAMILY } from '@constants/theme';
import EmailHistory from './EmailHistory';
import CallHistory from './CallHistory';
import WhatsAppHistory from './WhatsAppHistory';

const CustomTabBar = (props) => {
    return (
        <TabBar
            scrollEnabled={true}  // Enable horizontal scrolling
            {...props}
            style={{
                backgroundColor: COLORS.tabColor,
                justifyContent: 'center',
            }}
            indicatorStyle={{ backgroundColor: COLORS.tabIndicator, height: 3 }}
            labelStyle={{ color: COLORS.white, fontFamily: FONT_FAMILY.urbanistBold, fontSize: 13, textTransform: 'capitalize' }}
            pressColor='#2e294e'
            pressOpacity={0.5}
        />
    );
};

const LeadDetailTabs = ({ navigation, route }) => {
    const { id } = route?.params || {};
    const layout = useWindowDimensions();

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Details leadId={id} />;
            case 'second':
                return <FollowUp leadId={id} />;
            case 'third':
                return <EmailHistory leadId={id} />;
            case 'fourth':
                return <CallHistory leadId={id} />;
            case 'fifth':
                return <WhatsAppHistory leadId={id} />;
            default:
                return null;
        }
    };

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Details' },
        { key: 'second', title: 'Follow Up' },
        { key: 'third', title: 'Email History' },
        { key: 'fourth', title: 'Call History' },
        { key: 'fifth', title: 'WhatsApp History' },  // Corrected spelling
    ]);

    return (
        <SafeAreaView>
            <NavigationHeader
                title="Lead Details"
                onBackPress={() => navigation.goBack()}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={CustomTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>
    );
};

export default LeadDetailTabs;
