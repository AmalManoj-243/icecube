import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from '@components/containers';
import { TitleWithButton, NavigationHeader } from "@components/Header";
import { RoundedScrollContainer } from '@components/containers';
import { DropdownSheet } from "@components/common/BottomSheets";
import { TextInput as FormInput } from '@components/common/TextInput';
import { formatDate } from '@utils/common/date';
import { showToastMessage } from '@components/Toast';
import { fetchSupplierDropdown, fetchCurrencyDropdown, fetchCountryDropdown, fetchWarehouseDropdown } from "@api/dropdowns/dropdownApi";
import { purchaseType } from "@constants/dropdownConst";
import { fetchPurchaseOrderDetails } from '@api/details/detailApi';
import EditPurchaseOrderList from './EditPurchaseOrderList';
import { OverlayLoader } from '@components/Loader';
import { Button } from '@components/common/Button';
import { COLORS, FONT_FAMILY } from '@constants/theme';
import { ConfirmationModal } from '@components/Modal';

const EditPoDetails = ({ navigation, route }) => {
  const { id: purchaseOrderId } = route?.params || {};
  const [detail, setDetail] = useState({});
  console.log("Details : ", detail)
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchaseOrderLines, setPurchaseOrderLines] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [productLines, setProductLines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dropdown, setDropdown] = useState({
    vendorName: [],
    currency: [],
    purchaseType: [],
    countryOfOrigin: [],
    warehouse: [],
  });

  const fetchDetails = async (purchaseOrderId) => {
    setIsLoading(true);
    try {
      const [detail] = await fetchPurchaseOrderDetails(purchaseOrderId);
      console.log("🚀 ~ fetchDetails ~ detail:", JSON.stringify(detail, null, 2));
      if (detail) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          vendorName: { id: detail?.supplier?.supplier_id || '', label: detail?.supplier?.supplier_name?.trim() || '' },
          trnNumber: detail?.Trn_number.toString() || '',
          currency: { id: detail?.currency?.currency_id || '', label: detail?.currency?.currency_name || '' },
          orderDate: detail?.order_date || new Date(),
          purchaseType: detail?.purchase_type || '',
          countryOfOrigin: { id: detail?.country?.country_id || '', label: detail?.country?.country_name || '' },
          billDate: detail?.bill_date || null,
          warehouse: { id: detail?.warehouse_id || '', label: detail?.warehouse_name || '' },
        }));
        setDetail(detail);
        setPurchaseOrderLines(detail?.products_lines || []);
      } else {
        console.warn('No valid data received for purchase order details.');
        setFormData(null);
        setPurchaseOrderLines([]);
        showToastMessage({
          type: 'warning',
          title: 'Warning',
          message: 'No details found for the specified purchase order.',
        });
      }
    } catch (error) {
      console.error('Error fetching purchase order details:', error);
      setFormData(null);
      setPurchaseOrderLines([]);
      showToastMessage({
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch purchase order details. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };  

  useFocusEffect(
    useCallback(() => {
      if (purchaseOrderId) {
        fetchDetails(purchaseOrderId);
      }
    }, [purchaseOrderId])
  );

  useEffect(() => {
    const fetchSuppliers = async () => {
      if (selectedType === "Vendor Name") {
        try {
          const vendorData = await fetchSupplierDropdown(searchText);
          setDropdown((prevDropdown) => ({
            ...prevDropdown,
            vendorName: vendorData?.map((data) => ({
              id: data._id,
              label: data.name?.trim(),
            })),
          }));
        } catch (error) {
          console.error("Error fetching Supplier dropdown data:", error);
        }
      }
    };
    fetchSuppliers();
  }, [searchText, selectedType]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [currencyData, countryData, warehouseData] = await Promise.all([
          fetchCurrencyDropdown(),
          fetchCountryDropdown(),
          fetchWarehouseDropdown(),
        ]);
        setDropdown({
          currency: currencyData.map(data => ({
            id: data._id,
            label: data.currency_name,
          })),
          countryOfOrigin: countryData.map(data => ({
            id: data._id,
            label: data.country_name,
          })),
          warehouse: warehouseData.map(data => ({
            id: data._id,
            label: data.warehouse_name,
          })),
        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const toggleBottomSheet = (type) => {
    setSelectedType(type);
    setIsVisible(!isVisible);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...formData.imageUrls];
    updatedImages.splice(index, 1);
    handleFieldChange('imageUrls', updatedImages);
  };

  const validateForm = (fieldsToValidate) => {
    Keyboard.dismiss();
    const { isValid, errors } = validateFields(formData, fieldsToValidate);
    setErrors(errors);
    return isValid;
  };

  const renderBottomSheet = () => {
    let items = [];
    let fieldName = "";

    switch (selectedType) {
      case "Vendor Name":
        items = dropdown.vendorName;
        fieldName = "vendorName";
        break;
      case "Currency":
        items = dropdown.currency;
        fieldName = "currency";
        break;
      case "Purchase Type":
        items = purchaseType;
        fieldName = "purchaseType";
        break;
      case "Country Of Origin":
        items = dropdown.countryOfOrigin;
        fieldName = "countryOfOrigin";
        break;
      case "Warehouse":
        items = dropdown.warehouse;
        fieldName = "warehouse";
        break;
      default:
        return null;
    }
    return (
      <DropdownSheet
        isVisible={isVisible}
        items={items}
        title={selectedType}
        onClose={() => setIsVisible(false)}
        search={selectedType === "Vendor Name"}
        onSearchText={(value) => setSearchText(value)}
        onValueChange={(value) => {
          setSearchText("");
          handleFieldChange(fieldName, value);
          setIsVisible(false);
        }}
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (purchaseOrderId) {
        fetchDetails(purchaseOrderId);
      }
    }, [purchaseOrderId])
  );

  const { taxTotal } = useMemo(() => {
    let taxes = 0;
    purchaseOrderLines.forEach((item) => {
      taxes += item.tax_value || 0;
    });
    return {
      taxTotal: taxes.toFixed(2),
    };
  }, [purchaseOrderLines]);

  return (
    <SafeAreaView>
      <NavigationHeader
        title={'Edit Purchase Order Details'}
        onBackPress={() => navigation.goBack()}
        logo={false}
      />
      <RoundedScrollContainer>
        <FormInput
          label="Vendor Name"
          placeholder="Select Vendor Name"
          dropIcon="menu-down"
          editable={false}
          validate={errors.vendorName}
          value={formData.vendorName?.label}
          required
          multiline={true}
          onPress={() => toggleBottomSheet("Vendor Name")}
        />
        <FormInput
          label="TRN Number"
          placeholder="Enter Transaction Number"
          editable
          keyboardType="numeric"
          validate={errors.trnNumber}
          value={formData.trnNumber}
          required
          onChangeText={(value) => handleFieldChange('trnNumber', value)}
        />
        <FormInput
          label="Currency"
          placeholder="Select Currency"
          dropIcon="menu-down"
          editable={false}
          validate={errors.currency}
          value={formData.currency?.label}
          required
          onPress={() => toggleBottomSheet("Currency")}
        />
        <FormInput
          label="Order Date"
          editable={false}
          value={formatDate(formData.orderDate)}
        />
        <FormInput
          label="Purchase Type"
          placeholder="Select Purchase Type"
          dropIcon="menu-down"
          items={purchaseType}
          editable={false}
          validate={errors.purchaseType}
          value={formData.purchaseType}
          required
          onPress={() => toggleBottomSheet("Purchase Type")}
        />
        <FormInput
          label="Country Of Origin"
          placeholder="Select Country"
          dropIcon="menu-down"
          editable={false}
          validate={errors.countryOfOrigin}
          value={formData.countryOfOrigin?.label}
          required
          onPress={() => toggleBottomSheet("Country Of Origin")}
        />
        <FormInput
          label="Bill Date"
          dropIcon="calendar"
          placeholder="dd-mm-yyyy"
          editable={false}
          required
          validate={errors.billDate}
          value={formatDate(formData.billDate)}
          onPress={() => setIsDatePickerVisible(true)}
        />
        <FormInput
          label="Warehouse"
          placeholder="Select Warehouse"
          dropIcon="menu-down"
          editable={false}
          validate={errors.warehouse}
          value={formData.warehouse?.label}
          required
          onPress={() => toggleBottomSheet("Warehouse")}
        />
        <TitleWithButton
          label="Add an item"
          onPress={() => navigation.navigate('AddEditPurchaseLines')}
        />
        <FlatList
          data={purchaseOrderLines}
          renderItem={({ item }) => <EditPurchaseOrderList item={item}
            onPress={() => navigation.navigate('EditPurchaseLines', { id: item._id })} />}
          keyExtractor={(item) => item._id}
        />

        <View style={{ marginVertical: 2 }}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Untaxed Amount : </Text>
            <Text style={styles.totalValue}>{detail.untaxed_total_amount}</Text>
          </View>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Taxes : </Text>
            <Text style={styles.totalValue}>{taxTotal}</Text>
          </View>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total : </Text>
            <Text style={styles.totalValue}>{detail.total_amount}</Text>
          </View>
        </View>
        {renderBottomSheet()}
        <Button
          backgroundColor={COLORS.primaryThemeColor}
          title="UPDATE"
          onPress={() => {
            setIsConfirmationModalVisible(true);
          }}
        />

        <ConfirmationModal
          isVisible={isConfirmationModalVisible}
          onCancel={() => setIsConfirmationModalVisible(false)}
          headerMessage="Are you sure you want to delete this?"
          onConfirm={() => {
            handleDeletePrice();
            setIsConfirmationModalVisible(false);
          }}
        />
        <OverlayLoader visible={isLoading || isSubmitting} />
      </RoundedScrollContainer>
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
  totalSection: {
    flexDirection: 'row',
    marginVertical: 5,
    margin: 10,
    alignSelf: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.urbanistBold,
  },
  totalValue: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.urbanistBold,
    color: '#666666',
  },
});

export default EditPoDetails;