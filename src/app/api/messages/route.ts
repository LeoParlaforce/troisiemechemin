import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content } = body

    if (!content) {
      return new Response(JSON.stringify({ error: 'Missing content' }), { status: 400 })
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content }])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err: any) {
    console.error('POST exception:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
