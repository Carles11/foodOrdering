import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { InsertTables } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminOrdersList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  })
}

export const useMyOrdersList = () => {
  const { session } = useAuth()
  const id = session?.user?.id

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) {
        return null
      }
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  })
}

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const userId = session?.user.id

  return useMutation({
    async mutationFn(data: InsertTables<'orders'>) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({ ...data, user_id: userId })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError(error) {
      console.error(error)
    }
  })
}