// Show actionable diagnostics without exposing raw database messages or submitted data.
export function databaseErrorMessage(error: { code?: string } | null, operation = 'salvar'): string {
  const code = error?.code || '';
  if (code === '23505') return 'Esse endereço já está em uso. Escolha outro slug.';
  if (['PGRST204', 'PGRST205', '42703', '42P01'].includes(code)) {
    return `O banco não tem todas as tabelas ou campos exigidos pelo painel (${code}). Execute a versão atual de supabase/schema.sql no SQL Editor do mesmo projeto configurado em .env.local e tente novamente.`;
  }
  if (code === '42501') {
    return 'O Supabase bloqueou a operação por falta de permissão (42501). Confira a associação em admin_users e reaplique as políticas de supabase/schema.sql. Não é necessário desativar RLS.';
  }
  if (['PGRST301', 'PGRST303'].includes(code)) return 'Sua sessão não é mais válida. Saia da conta e entre novamente.';
  if (code === 'PGRST116') return 'O registro não foi encontrado ou não está acessível para sua conta. Atualize a listagem e confira suas permissões.';
  if (code === '23502') return 'O banco exige um campo que não foi preenchido (23502). Confira os campos obrigatórios e se o schema do banco corresponde ao projeto.';
  const reference = /^[A-Z0-9]{5,8}$/.test(code) ? ` Código: ${code}.` : '';
  return `Não foi possível ${operation}. Verifique sua conexão e a disponibilidade do Supabase.${reference}`;
}
