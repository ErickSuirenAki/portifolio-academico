import { NextResponse, type NextRequest } from 'next/server';
import { isSupabaseConfigured, supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code && isSupabaseConfigured()) {
    const sb = await supabaseServer();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL('/admin/redefinir', request.url));
  }
  return NextResponse.redirect(new URL('/admin/recuperar?erro=link', request.url));
}
