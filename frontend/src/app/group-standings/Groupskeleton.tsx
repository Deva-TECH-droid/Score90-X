'use client';

export function StandingTableSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 p-3.5 md:flex-row animate-pulse">
      {/* Left Content */}
      <div className="flex-1">
        {/* Title */}
        <div className="mb-2 h-8 w-52 rounded bg-slate-800" />
        <div className="mb-6 h-4 w-40 rounded bg-slate-800" />

        {/* Stage Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 w-28 rounded-xl bg-slate-800"
            />
          ))}
        </div>

        {/* Group Cards */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((group) => (
            <div
              key={group}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-5">
                <div className="h-6 w-24 rounded-full bg-slate-800" />
                <div className="h-4 w-24 rounded bg-slate-800" />
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-2 border-b border-slate-800 px-3 py-3">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-slate-800"
                  />
                ))}
              </div>

              {/* Team Rows */}
              {[1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-7 items-center gap-2 border-b border-slate-800 px-3 py-4"
                >
                  {/* Team */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-slate-800" />
                    <div className="h-7 w-7 rounded-full bg-slate-800" />
                    <div className="h-4 w-12 rounded bg-slate-800" />
                  </div>

                  {/* Stats */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="mx-auto h-4 w-6 rounded bg-slate-800"
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-3 md:w-[25%]">
        {/* Standings Guide */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 h-6 w-36 rounded bg-slate-800" />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="mb-4 flex items-center gap-3"
            >
              <div className="h-5 w-5 rounded-full bg-slate-800" />
              <div className="h-4 flex-1 rounded bg-slate-800" />
            </div>
          ))}
        </div>

        {/* Tournament Info */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 h-6 w-40 rounded bg-slate-800" />

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="mb-4 flex items-center justify-between"
            >
              <div className="h-4 w-24 rounded bg-slate-800" />
              <div className="h-4 w-10 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}