import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export const useProductList = () => {
  const {
    data: products,
    error,
    isLoading
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  })

  return { products, error, isLoading }
}
