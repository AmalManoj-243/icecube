import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const FONT_FAMILY = {
  urbanistBold: 'Urbanist-Bold',
};

const ListItem = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ececec',
    borderWidth: 1,
    height: 150,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    margin: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.urbanistBold,
    color: '#909090',
    alignSelf: 'center'
  },
});

export default ListItem;
