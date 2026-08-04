interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = 'Unable to load this content. Please try again later.',
}: ErrorMessageProps) {
  return (
    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-100">
      <p className="font-medium text-red-200">Error</p>
      <p className="mt-2 text-slate-200">{message}</p>
    </div>
  );
}
