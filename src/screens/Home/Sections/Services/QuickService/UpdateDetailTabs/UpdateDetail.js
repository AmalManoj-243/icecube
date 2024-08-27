import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RoundedScrollContainer } from '@components/containers';
import { TextInput as FormInput } from '@components/common/TextInput';
import { DropdownSheet } from '@components/common/BottomSheets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DetailField } from '@components/common/Detail';
import { formatDateTime } from '@utils/common/date';
import { showToastMessage } from '@components/Toast';
import { fetchServiceDetails } from '@api/details/detailApi';
import { OverlayLoader } from '@components/Loader';
import { COLORS, FONT_FAMILY } from "@constants/theme";
import { fetchProductsDropdown, fetchUnitOfMeasureDropdown } from '@api/dropdowns/dropdownApi';

const UpdateDetail = ({ serviceId }) => {
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [spareName, setSpareName] = useState(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [uom, setUom] = useState(null);
    const [savedItems, setSavedItems] = useState([]);

    const [formData, setFormData] = useState({
        warehouse: "",
        device: "",
        brand: "",
        consumerModel: "",
        serialNumber: "",
        imeiNumber: "",
        assignedTo: "",
        preCondition: "",
        estimation: "",
        remarks: "",
        accessories: [],
        complaints: "",
        subComplaints: "",
      });

    const [dropdown, setDropdown] = useState({
        products: [],
        unitofmeasure: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const ProductsData = await fetchProductsDropdown();
                setDropdown(prevDropdown => ({
                    ...prevDropdown,
                    products: ProductsData.map(data => ({
                        id: data._id,
                        label: data.product_name,
                    })),
                }));
            } catch (error) {
                console.error('Error fetching Products dropdown data:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchUnitOfMeasure = async () => {
            try {
                const UnitOfMeasureData = await fetchUnitOfMeasureDropdown();
                setDropdown(prevDropdown => ({
                    ...prevDropdown,
                    unitofmeasure: UnitOfMeasureData.map(data => ({
                        id: data._id,
                        label: data.uom_name,
                    })),
                }));
            } catch (error) {
                console.error('Error fetching Unit Of Measure dropdown data:', error);
            }
        };

        fetchUnitOfMeasure();
    }, []);

    const [selectedType, setSelectedType] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const navigation = useNavigation();

    const fetchDetails = async () => {
        setIsLoading(true);
        try {
            const updatedDetails = await fetchServiceDetails(serviceId);
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
            if (serviceId) {
                fetchDetails(serviceId);
            }
        }, [serviceId])
    );

    const toggleBottomSheet = (type) => {
        setSelectedType(type);
        setIsVisible(!isVisible);
    };

    const handleSave = () => {
        if (!spareName || !description || !quantity || !uom || !unitPrice) {
            showToastMessage('Please fill out all fields.');
            return;
        }
        const newItem = {
            // {
            //     job_registration_id: "66cc681fbf21f17a3e23c6ba",
            //     date: "2024-08-26T11:33:53.718Z",
            //     status: "waiting for parts",
            //     created_by: null,
            //     created_by_name: "",
            //     assignee_id: formData?.assignedTo.id ?? null,
            //     assignee_name: formData.assignedTo?.label ?? null,
            //     warehouse_id: formData?.warehouse.id ?? null,
            //     warehouse_name: formData.warehouse?.label ?? null,
            //     sales_person_id: formData?.assignedTo.id ?? null,
            //     sales_person_name: formData.assignedTo?.label ?? null,
            
                // product_id: "656f2cb002e1b1b31fafc6c6",
                // product_name: " DESKTOP POWER SUPPLY LENOVO PCG010 12V15A",
                // description: null,
                // uom_id: "66b5d3fbca5b01a2366b0b8e",
                // uom: "GRAMS",
                // quantity: 1,
                // unit_price: 160,
                // unit_cost: 100,
                // tax_type_id: "648d9b54ef9cd868dfbfa37b",
                // tax_type_name: "vat 5%",
                // job_diagnosis_id: "66cc6838bf21f17a3e23c6e2",
                // status: "out_of_stock",
                // "id": "66cc6838bf21f17a3e23c6e6",
                // "_v": 0
              }
            //   }
        //     spareName: spareName.label,
        //     description,
        //     quantity,
        //     uom: uom.label,
        //     unitPrice,
        // };
        setSavedItems([...savedItems, newItem]);
        setSpareName(null);
        setDescription('');
        setQuantity('');
        setUom(null);
        setUnitPrice('');
        setShowForm(false);
    };

    const renderBottomSheet = () => {
        let items = [];
        let fieldName = '';

        switch (selectedType) {
            case 'SpareName':
                items = dropdown.products;
                fieldName = 'spareName';
                break;
            case 'UOM':
                items = dropdown.unitofmeasure;
                fieldName = 'uom';
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
                onValueChange={(value) => {
                    if (fieldName === 'spareName') setSpareName(value);
                    else if (fieldName === 'uom') setUom(value);
                }}
            />
        );
    };

    const renderSavedItem = ({ item }) => (
        <View style={styles.savedItem}>
            <Text style={styles.savedItemText}>Spare Name: {item.spareName}</Text>
            <Text style={styles.savedItemText}>Description: {item.description}</Text>
            <Text style={styles.savedItemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.savedItemText}>UOM: {item.uom}</Text>
            <Text style={styles.savedItemText}>Unit Price: {item.unitPrice}</Text>
        </View>
    );

    return (
        <RoundedScrollContainer>
            <DetailField label="Customer" value={details?.customer_name || '-'} multiline numberOfLines={3} textAlignVertical={'top'} />
            <DetailField label="Mobile Number" value={details?.customer_mobile || '-'} />
            <DetailField label="Email" value={details?.customer_email || '-'} />
            <DetailField label="Warehouse Name" value={details?.warehouse_name || '-'} />
            <DetailField label="Created On" value={formatDateTime(details.date)} />
            <DetailField label="Created By" value={details?.assignee_name || '-'} />
            <DetailField label="Brand Name" value={details?.brand_name || '-'} />
            <DetailField label="Device Name" value={details?.device_name || '-'} />
            <DetailField label="Consumer Model" value={details?.consumer_model_name || '-'} />

            <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
                <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>

            {showForm && (
                <View style={styles.formContainer}>
                    <FormInput
                        label="Spare Name"
                        placeholder="Select Product Name"
                        dropIcon="menu-down"
                        editable={false}
                        items={dropdown.products}
                        value={spareName?.label}
                        onPress={() => toggleBottomSheet('SpareName')}
                    />
                    <FormInput
                        label="Description"
                        placeholder="Enter Description"
                        editable={true}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <FormInput
                        label="Quantity"
                        placeholder="Enter Quantity"
                        editable={true}
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                    <FormInput
                        label="UOM"
                        placeholder="Select Unit Of Measure"
                        dropIcon="menu-down"
                        editable={false}
                        items={dropdown.unitofmeasure}
                        value={uom?.label}
                        onPress={() => toggleBottomSheet('UOM')}
                    />
                    <FormInput
                        label="Unit Price"
                        placeholder="Enter Unit Price"
                        editable={true}
                        keyboardType="numeric"
                        value={unitPrice}
                        onChangeText={setUnitPrice}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
            {renderBottomSheet()}

            <FlatList
                data={savedItems}
                renderItem={renderSavedItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.savedItemsList}
            />
            <OverlayLoader visible={isLoading} />
        </RoundedScrollContainer>
    );
};

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#2e2a4f',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: 270,
        alignSelf: 'center',
    },
    addButtonText: {
        fontFamily: FONT_FAMILY.urbanistBold,
        color: COLORS.white,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#2e2a4f',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: 270,
        alignSelf: 'center',
    },
    saveButtonText: {
        fontFamily: FONT_FAMILY.urbanistBold,
        color: COLORS.white,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
    },
    savedItem: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    savedItemText: {
        fontFamily: FONT_FAMILY.urbanistRegular,
        fontSize: 14,
        marginBottom: 5,
    },
    savedItemsList: {
        marginTop: 20,
    },
});

export default UpdateDetail;
