'use client'

import { useEffect, useState, useRef } from 'react'

interface Message {
  id: number
  content: string
  role: 'user' | 'admin'
}

export default function ChatPage() {
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  // Génère un userId unique côté client uniquement
  useEffect(() => {
    let id = localStorage.getItem('user_id')
    if (!id) {
      id = (Math.random() + 1).toString(36).substring(2, 15)
      localStorage.setItem('user_id', id)
    }
    setUserId(id)
  }, [])

  const fetchMessages = async () => {
    if (!userId) return
    try {
      const res = await fetch('/api/messages', { headers: { 'x-user-id': userId } })
      const data = await res.json()
      setMessages(data || [])
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userId) fetchMessages()
  }, [userId])

  const sendMessage = async () => {
    if (!input.trim()) return
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input, role: 'user', user_id: userId })
      })
      setInput('')
      fetchMessages()
    } catch (err) {
      console.error(err)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <div style={{ minHeight: 400, border: '1px solid #ccc', borderRadius: 8, padding: 10, overflowY: 'auto' }}>
        {messages.map(m => (
          <div key={m.id} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '5px 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 16,
                backgroundColor: m.role === 'user' ? '#4ade80' : '#f3f4f6',
                color: m.role === 'user' ? '#000' : '#111'
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Écrire un message..."
        />
        <button
          style={{ marginLeft: 8, padding: '0 20px', borderRadius: 8, backgroundColor: '#2563eb', color: '#fff', border: 'none' }}
          onClick={sendMessage}
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}
