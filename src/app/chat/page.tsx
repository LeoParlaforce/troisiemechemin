'use client'

import { useEffect, useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setSending(true)
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          user_id: 'test-user'
        })
      })
      setContent('')
      await loadMessages()
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Test</h2>

      <div
        style={{
          border: '1px solid black',
          height: 200,
          overflowY: 'scroll',
          marginBottom: 10,
          padding: 5,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>{m.content}</div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 5 }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Écris un message"
          style={{ flex: 1, padding: 5 }}
        />
        <button type="submit" disabled={sending}>
          {sending ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  )
}
