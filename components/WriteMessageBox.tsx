'use client'

import { useEffect, useState, useCallback } from "react";
import { Session, createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { Message } from "@/lib/types/message";

export default function WriteMessageBox (user:string, threadId: number) {
    const supabase = createClientComponentClient()
    const [message, setMessage] = useState<Message>({})
    const handleMessageInput = (e:any)=>{
        const newMessage = {
            sent_by: user,
            contents: e.target.value,
            thread_id: threadId
        }
        setMessage(newMessage)
    }
    const handleSubmit = () => {

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={message?.contents} onChange={handleMessageInput}> 

                </input>

            </form>
        </>
    )
}