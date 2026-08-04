import SearchResults from '@/components/search/SearchResults';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="p-5">
      <SearchResults query={q || ''} />
    </div>
  );
}