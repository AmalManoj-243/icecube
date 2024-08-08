import React, { useState, useEffect } from 'react';
import { Keyboard, View } from 'react-native';
import { SafeAreaView } from '@components/containers';
import { NavigationHeader } from '@components/Header';
import { LoadingButton } from '@components/common/Button';
import { showToast } from '@utils/common';
import { post } from '@api/services/utils';
import { RoundedScrollContainer } from '@components/containers';
import { TextInput as FormInput } from '@components/common/TextInput';
import { DropdownSheet } from '@components/common/BottomSheets';
import {
  fetchSourceDropdown,
  fetchsalesPersonDropdown,
  fetchproductNameDropdown,
  fetchuomNameDropdown,
  fetchenquiryTypeDropdown
} from '@api/dropdowns/dropdownApi';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuthStore } from '@stores/auth';
import { formatDateTime } from '@utils/common/date';
import { validateFields } from '@utils/validation';

const AddInspectionItems = ({ navigation }) => {

  const currentUser = useAuthStore((state) => state.user);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDropdownType, setSelectedDropdownType] = useState(null);
  const [isDropdownSheetVisible, setIsDropdownSheetVisible] = useState(false);

  const [formData, setFormData] = useState({
    dateTime: new Date(),
    source: '',
    enquiryType: '',
    salesPerson: { id: currentUser?.related_profile?._id || '', label: currentUser?.related_profile?.name },
    opportunity: '',
    customer: '',
    remarks: '',
  });

  const [errors, setErrors] = useState({});
  const [dropdowns, setDropdowns] = useState({
    source: [],
    enquiryType: [],
    salesPerson: [],
    customer: [],
    opportunity: [],
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [productNameData, uomNameData] = await Promise.all([
          fetchproductNameDropdown(),
          fetchuomNameDropdown(),
        ]);
        setDropdowns({
            productName: productNameData.map(data => ({
            id: data._id,
            label: data.product_name,
          })),
          uomName: uomNameData.map(data => ({
            id: data._id,
            label: data.uom_name,
          })),
        });
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  };

  const toggleBottomSheet = (type) => {
    setSelectedDropdownType(type);
    setIsDropdownSheetVisible(!isDropdownSheetVisible);
  };

  const renderBottomSheet = () => {
    let items = [];
    let fieldName = '';

    switch (selectedDropdownType) {
      case 'Product Name':
        items = dropdowns.productName;
        fieldName = 'productName';
        break;
      case 'UOM Name':
        items = dropdowns.uomName;
        fieldName = 'uomName';
        break;
      default:
        return null;
    }
    return (
      <DropdownSheet
        isVisible={isDropdownSheetVisible}
        items={items}
        title={selectedDropdownType}
        onClose={() => setIsDropdownSheetVisible(false)}
        onValueChange={(value) => handleFieldChange(fieldName, value)}
      />
    );
  };

  const validateForm = (fieldsToValidate) => {
    Keyboard.dismiss();
    const { isValid, errors } = validateFields(formData, fieldsToValidate);
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    const fieldsToValidate = ['productName', 'uomName'];
    if (validateForm(fieldsToValidate)) {
      setIsSubmitting(true);
      const InspectionData = {
        product_name_id: formData?.productName?.id || null,
        uom_name_id: formData?.uomName?.id || null,
      };

      console.log("Submitting Inspection Data:", InspectionData)
      try {
        const response = await post("/createBoxInspection", InspectionData);
        if (response.success) {
          showToast({
            type: "success",
            title: "Success",
            message: response.message || "Box Inspection created successfully",
          });
          navigation.navigate("BoxInspectionScreen");
        } else {
          showToast({
            type: "error",
            title: "ERROR",
            message: response.message || "Box Inspection creation failed",
          });
        }
      } catch (error) {
        showToast({
          type: "error",
          title: "ERROR",
          message: "An unexpected error occurred. Please try again later.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <NavigationHeader
        title="Add Inspection Items"
        onBackPress={() => navigation.goBack()}
      />
      <RoundedScrollContainer>
        <FormInput
          label="Product Name"
          placeholder="Select Product Name"
          required
          dropIcon="menu-down"
          editable={false}
          validate={errors.productName}
          value={formData.productName?.label?.trim()}
          onPress={() => toggleBottomSheet('Product Name')}
        />
        <FormInput
          label="Box Quantity"
          placeholder="Enter Box Quantity"
          editable={true}
          keyboardType="numeric"
          validate={errors.phoneNumber}
          onChangeText={(value) => handleFieldChange('remarks', value)}
        />
        <FormInput
          label="Unit Of Measure"
          placeholder="Select Unit Of Measure"
          required
          dropIcon="menu-down"
          editable={false}
          validate={errors.uomName}
          value={formData.uomName?.label}
          onPress={() => toggleBottomSheet('Unit Of Measure')}
        />
        {renderBottomSheet()}
        <LoadingButton title="SAVE" onPress={handleSubmit} loading={isSubmitting} marginTop={10} />
      </RoundedScrollContainer>
    </SafeAreaView>

  );
};

export default AddInspectionItems;
