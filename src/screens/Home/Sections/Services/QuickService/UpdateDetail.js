import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from '@components/containers';
import NavigationHeader from '@components/Header/NavigationHeader';
import { RoundedScrollContainer } from '@components/containers';
import { DetailField } from '@components/common/Detail';
import { OverlayLoader } from '@components/Loader';
import { Button } from '@components/common/Button';
import SparePartsList from './SparePartsList';
import { formatDateTime } from '@utils/common/date';
import { showToastMessage } from '@components/Toast';
import { fetchServiceDetails } from '@api/details/detailApi';
import { COLORS, FONT_FAMILY } from '@constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { post, put } from '@api/services/utils'; 
import { useAuthStore } from '@stores/auth';
import { showToast } from '@utils/common';

const UpdateDetails = ({ route, navigation }) => {
  const { id } = route.params || {};
  const currentUser = useAuthStore((state) => state.user);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  const [sparePartsItems, setSparePartsItems] = useState([]);

  const addSpareParts = (addedItems) => {
    setSparePartsItems(prevItems => [...prevItems, addedItems]);
  };

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const updatedDetails = await fetchServiceDetails(id);
      setDetails(updatedDetails[0] || {});
    } catch (error) {
      console.error('Error fetching service details:', error);
      showToastMessage('Failed to fetch service details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchDetails(id);
      }
    }, [id])
  );

  const handleSave = async () => {
    setIsSaving(true);
    const savePayload = {
      _id: id,
      job_stage: "In Progress",
    };

    try {
      const response = await put(`/updateJobRegistration`, savePayload);
      if (response.success === 'true') {
        showToast({
          type: "success",
          title: "Success",
          message: response.message || "Job registration updated successfully",
        });
      } else {
        console.error("Save Failed:", response.message);
        showToast({
          type: "error",
          title: "ERROR",
          message: response.message || "Job registration update failed",
        });
      }
    } catch (error) {
      console.error("Error Saving Job Registration:", error);
      showToast({
        type: "error",
        title: "ERROR",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const requestPayload = {
      _id: id,
      job_stage: "Waiting for spare",
      create_job_diagnosis: [
        {
          job_registration_id: id,
          proposed_action_id: null,
          proposed_action_name: null,
          done_by_id: currentUser?.related_profile?._id || null,
          done_by_name: currentUser?.related_profile?.name || '',
          // assigned_to: "6650704c2e5cf73d84470013",
          // assigned_to_name: "Abhijith Danat",
          // warehouse_id: currentUser?.warehouse?.warehouse_id,
          // warehouse_name: currentUser?.warehouse?.warehouse_name,
          untaxed_total_amount: 12, //
          parts_or_service_required: null,
          service_type: null,
          service_charge: items?.serviceCharge,  
          total_amount: items?.totalAmount,  
          parts: sparePartsItems.map((items) => ({
            product_id: items?.product?.id,
            product_name: items?.product?.label,
            description: items?.description,
            uom_id: items?.uom?.id,
            uom: items?.uom?.label,
            unit_price: items?.unitPrice,
            tax_type_id: items?.tax?.id,
            tax_type_name: items?.tax?.label,
            quantity: items?.quantity,
            sub_total: items?.subTotal,
            unit_cost: items?.totalAmount,
          }))
        }
      ]
    };
    console.log("🚀 ~ file: UpdateDetail.js:25 ~ requestPayload ~ requestPayload:", JSON.stringify(requestPayload, null, 2))

    try {
      const response = await post("/createJobApproveQuote", requestPayload);
      if (response.success === 'true') {
        showToast({
          type: "success",
          title: "Success",
          message: response.message || "Spare Parts Request updated successfully",
        });
        navigation.navigate("QuickServiceScreen");
      } else {
        console.error("Submit Failed:", response.message);
        showToast({
          type: "error",
          title: "ERROR",
          message: response.message || "Spare Parts Request update failed",
        });
      }
    } catch (error) {
      console.error("Error Submitting Spare Parts Request:", error);
      showToast({
        type: "error",
        title: "ERROR",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader
        title="Update Details"
        onBackPress={() => navigation.goBack()}
      />
      <RoundedScrollContainer>
        <DetailField
          label="Customer"
          value={details?.customer_name?.trim() || '-'}
          multiline
          numberOfLines={3}
          textAlignVertical={'top'}
        />
        <DetailField label="Mobile Number" value={details?.customer_mobile || '-'} />
        <DetailField label="Email" value={details?.customer_email || '-'} />
        <DetailField label="Warehouse Name" value={details?.warehouse_name || '-'} />
        <DetailField label="Created On" value={formatDateTime(details.date)} />
        <DetailField label="Created By" value={details?.assignee_name || '-'} />
        <DetailField label="Brand Name" value={details?.brand_name || '-'} />
        <DetailField label="Device Name" value={details?.device_name || '-'} />
        <DetailField label="Consumer Model" value={details?.consumer_model_name || '-'} />
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={styles.label}>Add an Item</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddSpareParts', { id, addSpareParts })}>
            <AntDesign name="pluscircle" size={26} color={COLORS.orange} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={sparePartsItems}
          renderItem={({ item }) => (
            <SparePartsList item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title={'SAVE'}
          width={'50%'}
          alignSelf={'center'}
          backgroundColor={isSaving ? COLORS.gray : COLORS.primaryThemeColor}
          onPress={handleSave}
          disabled={isSaving || isSubmitting}
        />
        <Button
          title={'SUBMIT'}
          width={'50%'}
          alignSelf={'center'}
          backgroundColor={COLORS.orange}
          onPress={handleSubmit}
        />

      </RoundedScrollContainer>
      {isLoading && <OverlayLoader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: COLORS.primaryThemeColor,
    fontFamily: FONT_FAMILY.urbanistSemiBold,
  },
});

export default UpdateDetails;
