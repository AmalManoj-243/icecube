import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
// import COLORS from '../../constants/color';
import Text from '@components/Text';
// import { errorImage } from '@constants/links';

const ProductsList = ({ item, onPress }) => {

    const errorImage = require('@assets/images/error/error.png');
    useEffect(() => {
        const timeout = setTimeout(() => {
            // Stop the loading indicator after a timeout (e.g., 10 seconds)
            setImageLoading(false);
        }, 10000); // Adjust the timeout as needed

        return () => clearTimeout(timeout);
    }, []);

    const [imageLoading, setImageLoading] = useState(true);
    const truncatedName =
        item?.product_name?.length > 15 ? item?.product_name?.substring(0, 15) + '...' : item?.product_name;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {imageLoading && <ActivityIndicator size="small" color={'black'} style={{ position: 'absolute', top: 30 }} />}
            <Image
                source={item?.image_url ? { uri: item.image_url } : errorImage}
                style={styles.image}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
            />
            <View style={{ paddingTop: 50 }}></View>

            <View style={styles.textContainer}>
                <Text style={styles.name}>{truncatedName}</Text>
            </View>
            {/* <View style={[styles.bottomBar, { backgroundColor: '#F37021' }]}> */}
            {/* <Text style={styles.price}>Price: ${item?.portal_price}</Text> */}
            {/* </View> */}
        </TouchableOpacity>
    );
};

export default ProductsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 6,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        // marginVertical:10,
        // marginBottom:5,
        borderColor: 'black',
        backgroundColor: "white",
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: 10, // you can remove also the marginTop 
        // marginBottom: 10,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#2E2B2B',
        fontFamily: 'Urbanist-Bold'
    },
    price: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Urbanist-Regular',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
