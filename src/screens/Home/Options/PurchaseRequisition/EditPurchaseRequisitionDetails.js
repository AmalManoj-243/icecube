import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from '@components/containers';
import NavigationHeader from '@components/Header/NavigationHeader';
import { RoundedScrollContainer } from '@components/containers';
import { DetailField } from '@components/common/Detail';
import { formatDate } from '@utils/common/date';
import { showToastMessage } from '@components/Toast';
import { TextInput as FormInput } from "@components/common/TextInput";
import { fetchPurchaseRequisitionDetails, fetchSupplierDropDown } from '@api/details/detailApi';
import PurchaseDetailList from './PurchaseDetailList';
import { OverlayLoader } from '@components/Loader';
import { Button } from '@components/common/Button';
import { COLORS } from '@constants/theme';
import { put } from '@api/services/utils';
import { ConfirmationModal } from '@components/Modal';
import { DropdownSheet } from "@components/common/BottomSheets";

const EditPurchaseRequisitionDetails = ({ navigation, route }) => {
  const { id: purchaseId } = route?.params || {};
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productLines, setProductLines] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]); 
  const [dropdown, setDropdown] = useState({ suppliers: [] });
  const [actionToPerform, setActionToPerform] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const updatedDetails = await fetchPurchaseRequisitionDetails(purchaseId);
      const requestDetails = updatedDetails[0]?.request_details?.[0];
      setDetails(updatedDetails[0] || {});
      setProductLines(requestDetails?.products_lines || []);
      setSelectedSuppliers([{ id: requestDetails?.supplier?._id, label: requestDetails?.supplier?.name }]);
    } catch (error) {
      console.error('Error fetching service details:', error);
      showToastMessage('Failed to fetch service details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierData = await fetchSupplierDropDown(searchText);
        setDropdown((prevDropdown) => ({
          ...prevDropdown,
          suppliers: supplierData?.map((data) => ({
            id: data._id,
            label: data.name?.trim(),
          })),
        }));
      } catch (error) {
        console.error("Error fetching Supplier dropdown data:", error);
      }
    };
    fetchSuppliers();
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      if (purchaseId) {
        fetchDetails(purchaseId);
      }
    }, [purchaseId])
  );

  const toggleBottomSheet = (type) => {
    setSelectedType(type);
    setIsVisible((prev) => !prev);
  };

  const handleEditPurchase = async () => {
    setIsSubmitting(true);
    try {
      const updateData = {
        _id: details._id,
        supplier_id: selectedSuppliers[0]?.id, // Sending selected supplier ID
        product_lines: productLines, // Assuming product lines remain the same
      };
      const response = await put('/updatePurchaseRequisition', updateData);
      if (response.success === "true") {
        showToastMessage('Purchase Updated Successfully');
        navigation.navigate('PurchaseRequisitionScreen');
      } else {
        showToastMessage('Failed to update purchase. Please try again.');
      }
    } catch (error) {
      showToastMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <NavigationHeader
        title={details?.sequence_no || 'Purchase Requisition Details'}
        onBackPress={() => navigation.goBack()}
        logo={false}
      />
      <RoundedScrollContainer>
        <DetailField label="Requested By" value={details?.request_details?.[0]?.requested_by?.employee_name || '-'} />
        <DetailField label="Request Date" value={formatDate(details?.request_details?.[0]?.request_date)} />
        <DetailField label="Warehouse" value={details?.request_details?.[0]?.warehouse?.warehouse_name || '-'} />
        <DetailField label="Require By" value={formatDate(details?.request_details?.[0]?.require_by)} />
        <FormInput
          label={"Supplier"}
          placeholder={"Add Suppliers"}
          dropIcon={"menu-down"}
          multiline={true}
          editable={false}
          required
          value={selectedSuppliers.map((supplier) => supplier.label).join(", ")}
          onPress={() => toggleBottomSheet("Supplier")}
        />

        <FlatList
          data={productLines}
          renderItem={({ item }) => <PurchaseDetailList item={item} />}
          keyExtractor={(item) => item._id}
        />

        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <Button
            width={'50%'}
            backgroundColor={COLORS.tabIndicator}
            title="DELETE"
            onPress={() => {
              setActionToPerform('delete');
              setIsConfirmationModalVisible(true);
            }}
          />
          <View style={{ width: 5 }} />
          <Button
            width={'50%'}
            backgroundColor={COLORS.green}
            title="EDIT"
            onPress={handleEditPurchase}
          />
        </View>

        <DropdownSheet
          isVisible={dropdown.isVisible}
          data={dropdown.suppliers}
          onSelect={(selectedItem) => setSelectedSuppliers([selectedItem])}
        />

        <ConfirmationModal
          isVisible={isConfirmationModalVisible}
          onCancel={() => setIsConfirmationModalVisible(false)}
          headerMessage='Are you sure you want to Delete this?'
          onConfirm={() => {
            handleDeletePurchase();
            setIsConfirmationModalVisible(false);
          }}
        />

        <OverlayLoader visible={isLoading || isSubmitting} />
      </RoundedScrollContainer>
    </SafeAreaView>
  );
};

export default EditPurchaseRequisitionDetails;
