'use client'

import { useEffect, useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    const res = await fetch('/api/messages')
    const data = await res.json()
    setMessages(data)
  }

  async function sendMessage() {
    if (content.trim() === '') return

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        user_id: 'test-user'
      })
    })

    setContent('')
    loadMessages()
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        {messages.map((m, i) => (
          <div key={i}>{m.content}</div>
        ))}
      </div>

      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ border: '1px solid black' }}
      />

      <button onClick={sendMessage}>Envoyer</button>
    </div>
  )
}
