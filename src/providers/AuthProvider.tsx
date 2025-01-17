import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type AuthData = {
  session: Session | null
  loading: boolean
  profile: { group?: string } | null
  isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<null | Session>(null)
  const [profile, setProfile] = useState<{ group?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      setSession(session)

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user.id)
          .single()
        setProfile(data || null)
      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
