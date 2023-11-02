'use client'
import { useEffect, useState, useCallback } from "react";
import { Session, createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { Message } from "@/lib/types/message";
import WriteMessageBox from "./WriteMessageBox";
export default  function Messaging ({session}: {session:Session | null}){
    const supabase = createClientComponentClient()
    console.log(session)
    const thread_id = 1
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<Message[]| []>([])
    const handleUpdates = (payload: any) => {
        if (messages.length == 0 ){
            setMessages([payload])
        } else {
            let newMessages = messages
            newMessages.splice(payload)
            setMessages(newMessages)

        }
    }
    supabase
        .channel('messages')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, handleUpdates)
        .subscribe()
    const getMessages = useCallback(async () => {
        try {
            setLoading(true)
            let {data, error, status} = await supabase.from("messages").select().eq('thread_id', thread_id)
            if (error && status !== 406) {
                throw error
              }
            if (data)  {
                setMessages(data)
            }
        } catch (error){
            alert("error loading messages")
        } finally {
            setLoading(false)
        }
    }, [supabase, thread_id])
    useEffect(()=>{
        getMessages()
    }, [thread_id, getMessages])

    // const { data: messages } =  supabase.from("messages").select().eq('thread_id', thread_id);

    return (
        <div>
            <h3>
                messaging will go here
            </h3>
                {messages?.map((message) => (
                    <p key={message.id}>{message.contents}</p>
                    ))}

            {/* <WriteMessageBox  user={""}/> */}
        </div>
    )
}