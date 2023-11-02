import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import Messaging from '@/components/Messaging'
import { PostgrestQueryBuilder, PostgrestClient, PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { RealtimeChannelOptions, RealtimeChannel } from '@supabase/supabase-js'
export default async function TestPage () {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { session },
      } = await supabase.auth.getSession()
      const {
        data: { user },
      } = await supabase.auth.getUser()  
      console.log( user)

    
    if(session){
        return (
            <div className="w-full flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                <div />
                <div>
                    <div className="flex items-center gap-4">
                      Hey, {user?.email}!
                      <LogoutButton />
                    </div>
                </div>
              </div>
            </nav>
            <div>
              <Messaging session={session} />
            </div>
            </div>
        )
    } else {
        redirect('/login')
    }
    // async check here? if no use/ redirect to index
}