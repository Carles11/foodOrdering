import { useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { defaultPizzaImage } from '@/constants/Helpers'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
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

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
  const isUpdating = !!idString

  const { mutate: insertProduct } = useInsertProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { data: updatingProduct } = useProduct(id)

  const router = useRouter()

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

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
    //  save in database
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      }
    )
  }

  const onUpdate = () => {
    if (!validateInputs()) {
      return
    }
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      }
    )
  }

  const onDelete = () => {
    console.log('delete')
  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      { text: 'Delete', style: 'destructive', onPress: () => onDelete() },
      { text: 'Cancel' }
    ])
  }

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
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
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />
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
      <Button
        text={isUpdating ? 'Update' : 'Create'}
        onPress={() => onSubmit()}
      />
      {isUpdating && <Button text="Delete" onPress={() => confirmDelete()} />}
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
