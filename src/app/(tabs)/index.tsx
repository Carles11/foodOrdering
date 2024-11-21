import { StyleSheet, Image } from 'react-native';

import products from '@/assets/data/products';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

const product = products[1];
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white',
   padding: 10,
   borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: { width: "100%", aspectRatio: 1 }
});
