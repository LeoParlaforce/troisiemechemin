import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET : récupère les messages d’un utilisateur
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

    const { data, error } = await supabase
      .from('messages')
      .select('id, content, role, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST : ajoute un message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content, role, user_id } = body

    if (!content || !role || !user_id) {
      return NextResponse.json({ error: 'Missing content, role or user_id' }, { status: 400 })
    }

    // On force un rôle valide et user_id string
    const { data, error } = await supabase
      .from('messages')
      .insert([{ content, role, user_id: String(user_id) }])
      .select('id, content, role, created_at')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
