import React from 'react'
import { RoundedScrollContainer, SafeAreaView } from '@components/containers'
import { NavigationHeader } from '@components/Header'
import Text from '@components/Text'
import { View, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, FONT_FAMILY } from '@constants/theme';
import { DetailField } from '@components/common/Detail';
import { EmptyState } from '@components/common/empty';
import { formatDate } from '@utils/common/date';
import InventoryBoxList from './InventoryBoxList';

const InventoryDetails = ({ navigation, route }) => {
  const { inventoryDetails } = route?.params || {};

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <EmptyItem />;
    }
    return <InventoryBoxList item={item} />;
  };

  const renderEmptyState = () => (
    <EmptyState imageSource={require('@assets/images/EmptyData/empty_inventory_box.png')} message={''} />
  );

  const renderContent = () => (
    <FlatList
      data={inventoryDetails?.items || []}
      numColumns={1}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={100}

    />
  );
  const renderInventoryRequest = () => {
    if (inventoryDetails?.items?.length === 0) {
      return renderEmptyState();
    }
    return renderContent();
  };
  return (
    <SafeAreaView>
      <NavigationHeader
        onBackPress={() => navigation.goBack()}
        title={'Inventory Details'}
      />
      <RoundedScrollContainer >
        <DetailField label={'Inventory Box'} value={inventoryDetails?.name} />
        <DetailField label={'Location'} value={inventoryDetails?.location_name} />
        <DetailField label={'Date'} value={formatDate(inventoryDetails?.date, "yyyy-MM-dd hh:mm a")} />
        <View style={{marginVertical:10}}/>
        <Text style={styles.label}>Box Items</Text>
        {renderInventoryRequest()}
      </RoundedScrollContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: COLORS.primaryThemeColor,
    fontFamily: FONT_FAMILY.urbanistSemiBold,
  },
});


export default InventoryDetails