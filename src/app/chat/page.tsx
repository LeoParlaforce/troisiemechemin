'use client'

import { useEffect, useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)

  // Charge les messages depuis l'API
  const loadMessages = async () => {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error('loadMessages error:', err)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  // Envoie le message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setSending(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      console.log('POST response:', data) // <-- log de l’erreur éventuelle
      setContent('')
      await loadMessages()
    } catch (err) {
      console.error('fetch error:', err)
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
          height: 300,
          overflowY: 'auto',
          marginBottom: 10,
          padding: 5,
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: '#888' }}>Aucun message</div>
        ) : (
          messages.map((m, i) => <div key={i}>{m.content}</div>)
        )}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 5 }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
