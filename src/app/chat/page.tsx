'use client'

import { useEffect, useState } from 'react'

type Message = {
  id: string
  content: string
  created_at: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(setMessages)
  }, [])

  async function sendMessage() {
    if (!content) return

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        user_id: 'test-user'
      })
    })

    setContent('')

    const res = await fetch('/api/messages')
    setMessages(await res.json())
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        {messages.map(m => (
          <div key={m.id}>{m.content}</div>
        ))}
      </div>

      <input
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  )
}
