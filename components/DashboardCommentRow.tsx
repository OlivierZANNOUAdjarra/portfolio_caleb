'use client';

import { useTransition } from 'react';
import { approveComment, deleteComment, type Comment } from '@/app/actions/comments';
import { Check, Trash2 } from 'lucide-react';

export default function DashboardCommentRow({ comment }: { comment: Comment }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl2 border border-ink/10 bg-white/60 p-4">
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-ink">{comment.name}</p>
        <p className="mt-1 text-sm text-ink/70">{comment.message}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        {!comment.approved && (
          <button
            disabled={isPending}
            onClick={() => startTransition(() => approveComment(comment.id))}
            aria-label="Approuver"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200 disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
          </button>
        )}
        <button
          disabled={isPending}
          onClick={() => startTransition(() => deleteComment(comment.id))}
          aria-label="Supprimer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 transition-colors hover:bg-red-200 disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}