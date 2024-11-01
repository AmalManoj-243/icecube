import React, { useEffect, useState } from "react";
import { RoundedScrollContainer, SafeAreaView } from "@components/containers";
import { NavigationHeader } from "@components/Header";
import { TextInput as FormInput } from "@components/common/TextInput";
import { Button } from "@components/common/Button";
import { DropdownSheet } from "@components/common/BottomSheets";
import { COLORS } from "@constants/theme";
import { fetchProductsDropdown } from "@api/dropdowns/dropdownApi";
import { Keyboard } from "react-native";
import { validateFields } from '@utils/validation';

const AddPurchaseLines = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [dropdown, setDropdown] = useState({ products: [] });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchProductsDropdown(searchText);
        setDropdown({
          products: productsData?.map((data) => ({
            id: data._id,
            label: data.product_name?.trim(),
          })),
        });
      } catch (error) {
        console.error("Error fetching Products dropdown data:", error);
      }
    };
  
    fetchProducts();
  }, [searchText]);
  
  const handleProductSelection = (selectedProduct) => {
    setFormData({
      productId: selectedProduct.id,
      productName: selectedProduct.label,
    });
    setIsVisible(false);
  };  
  
  const toggleBottomSheet = () => {
    setIsVisible((prev) => !prev);
  };

  const validateForm = (fieldsToValidate) => {
    Keyboard.dismiss();
    const { isValid, errors } = validateFields(formData, fieldsToValidate);
    setErrors(errors);
    return isValid;
  };

  const handleAddProducts = () => {
    const fieldsToValidate = ['productName'];
    if (validateForm(fieldsToValidate)) {
      const productLine = {
        product_name: formData.productName,
        product_id: formData.productId,
      };
      console.log('Product Line Data:', productLine);
      navigation.navigate("PurchaseOrderForm", { newProductLine: productLine });
    }
  };

  return (
    <SafeAreaView>
      <NavigationHeader
        title="Add Products"
        onBackPress={() => navigation.goBack()}
      />
      <RoundedScrollContainer>
        <FormInput
          label="Product"
          placeholder="Select Product"
          dropIcon="menu-down"
          editable={false}
          required
          multiline={true}
          validate={errors.productName}
          value={formData.productName} 
          onPress={toggleBottomSheet}
        />
        <Button
          title="Add Product"
          width="50%"
          alignSelf="center"
          backgroundColor={COLORS.primaryThemeColor}
          onPress={handleAddProducts}
        />
        {isVisible && (
          <DropdownSheet
            isVisible={isVisible}
            items={dropdown.products}
            title="Select Product"
            onClose={() => setIsVisible(false)}
            search
            onSearchText={setSearchText}
            onValueChange={handleProductSelection}
          />
        )}
      </RoundedScrollContainer>
    </SafeAreaView>
  );
};

export default AddPurchaseLines;