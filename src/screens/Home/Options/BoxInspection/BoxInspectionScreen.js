import React, { useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { formatData } from '@utils/formatters';
import { RoundedContainer, SafeAreaView, SearchContainer } from '@components/containers';
import { EmptyItem, EmptyState } from '@components/common/empty';
import { NavigationHeader } from '@components/Header';
import { FABButton } from '@components/common/Button';
import { useAuthStore } from '@stores/auth';
import { OverlayLoader } from '@components/Loader';
import BoxInspectionList from './BoxInspectionList';
import { fetchNonInspectedBoxDropdown } from '@api/dropdowns/dropdownApi';

const BoxInspectionScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuthStore(state => state.user);
  const warehouseId = currentUser?.warehouse?.warehouse_id || '';

  const fetchNonInspectedBoxList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchNonInspectedBoxDropdown(warehouseId);
      const formattedData = response.map(({ box_id, box_name }) => ({
        boxId: box_id,
        boxName: box_name,
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Failed to fetch non-inspected box list:', error);
    } finally {
      setLoading(false);
    }
  }, [warehouseId]);

  useFocusEffect(
    useCallback(() => {
      fetchNonInspectedBoxList();
    }, [fetchNonInspectedBoxList])
  );

  const handleNavigateToForm = useCallback(
    item => {
      navigation.navigate('BoxInspectionForm', { item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (item.empty ? <EmptyItem /> : <BoxInspectionList item={item} onPress={() => handleNavigateToForm(item)} />),
    [handleNavigateToForm]
  );

  const renderEmptyState = useCallback(
    () => (
      <EmptyState imageSource={require('@assets/images/EmptyData/empty_inventory_box.png')} />
    ),
    []
  );

  const renderContent = useCallback(
    () => (
      <FlashList
        data={formatData(data, 4)}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 50, padding: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        estimatedItemSize={100}
      />
    ),
    [data, renderItem]
  );

  const renderBoxInspection = useCallback(() => {
    if (data.length === 0 && !loading) {
      return renderEmptyState();
    }
    return renderContent();
  }, [data, loading, renderContent, renderEmptyState]);

  return (
    <SafeAreaView>
      <NavigationHeader
        title="Box Inspection"
        onBackPress={() => navigation.goBack()}
      />
      <SearchContainer placeholder="Search Boxes..." onChangeText={() => {}} />
      <RoundedContainer>
        {renderBoxInspection()}
        <FABButton onPress={() => navigation.navigate('BoxInspectionForm')} />
      </RoundedContainer>
      <OverlayLoader visible={loading} />
    </SafeAreaView>
  );
};

export default BoxInspectionScreen;
