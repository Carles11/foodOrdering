import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { defaultPizzaImage } from '@/constants/Helpers'
import * as ImagePicker from 'expo-image-picker'
import { Stack } from 'expo-router'
import { useState } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateInputs = () => {
    if (!name) {
      setErrors({ name: 'Name is required' })
      return false
    }

    if (!price) {
      setErrors({ price: 'Price is required' })
      return false
    }

    if (isNaN(parseFloat(price))) {
      setErrors({ price: 'Price must be a number' })
      return false
    }

    return true
  }
  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const onCreate = () => {
    if (!validateInputs()) {
      return
    }
    console.warn('Creating product', { name, price })
    // TODO: save in database

    resetFields()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Pressable onPress={pickImageAsync}>
        <Text style={styles.textButton}>Select Image</Text>
      </Pressable>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name the product"
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      {Object.keys(errors).map((key) => (
        <Text key={key} style={{ color: 'tomato' }}>
          {errors[key]}
        </Text>
      ))}
      <Button text="create" onPress={() => onCreate()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  textButton: {
    textAlign: 'center',
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: 'gray'
  }
})
export default CreateProductScreen
