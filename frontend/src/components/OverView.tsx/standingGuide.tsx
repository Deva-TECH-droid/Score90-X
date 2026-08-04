export function StandingsGuide() {
  const items = [
    {
      color: 'bg-green-500',
      title: 'Qualified',
      description: 'Advance to Round of 32',
    },
    {
      color: 'bg-yellow-500',
      title: 'Playoff',
      description: 'May advance via playoffs',
    },
    {
      color: 'bg-red-500',
      title: 'Eliminated',
      description: 'Out of the tournament',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm">
      <h3 className="mb-3 text-lg font-medium text-white">
        Standings Guide
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div
              className={`mt-1 h-3 w-3 rounded-full ${item.color}`}
            />
            <div>
              <p className="font-medium   text-sm up text-white">
                {item.title}
              </p>
              <p className="text-sm text-slate-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}