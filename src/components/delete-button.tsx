'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteContent } from '@/app/admin/actions';

export function DeleteButton({ section, id, title }: { section: string; id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  function remove() {
    startTransition(async () => {
      try {
        const result = await deleteContent(section, id);
        if (result.error) setError(result.error);
        else { setConfirming(false); router.refresh(); }
      } catch { setError('Não foi possível excluir. Verifique sua sessão.'); }
    });
  }
  return <div className="text-sm">
    {!confirming ? <button className="text-rose-300 underline" aria-label={`Excluir ${title}`} onClick={() => setConfirming(true)}>Excluir</button>
      : <div className="space-y-2"><p>Excluir “{title}” permanentemente?</p><div className="flex gap-3"><button className="text-rose-300 underline" disabled={pending} onClick={remove}>{pending ? 'Excluindo…' : 'Confirmar exclusão'}</button><button disabled={pending} onClick={() => setConfirming(false)}>Cancelar</button></div></div>}
    {error && <p role="alert" className="text-amber-300 mt-2">{error}</p>}
  </div>;
}
