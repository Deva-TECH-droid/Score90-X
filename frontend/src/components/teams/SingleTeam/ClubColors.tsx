import { Palette } from "lucide-react";

type ClubColorsProps = {
  clubColors: string;
};

const colorMap: Record<string, string> = {
  White: '#FFFFFF',
  Black: '#000000',
  Red: '#DC2626',
  Blue: '#2563EB',
  'Sky Blue': '#38BDF8',
  Green: '#16A34A',
  Yellow: '#FACC15',
  Orange: '#F97316',
  Purple: '#9333EA',
  Gold: '#FBBF24',
  Silver: '#94A3B8',
  Maroon: '#7F1D1D',
  Navy: '#1E3A8A',
};

export default function ClubColors({ clubColors }: ClubColorsProps) {
  const colors = clubColors.split('/').map((c) => c.trim());

  return (
    <div className="rounded-xl space-x-1 flex bg-slate-950/90 border border-slate-800   p-2">
              <Palette className="text-indigo-600" size={16} />
      <p className=" text-slate-500 text-sm">
        Club Colors:
      </p>

      <div className="flex flex-wrap items-center gap-1">

        {colors.map((color) => (
          <div key={color} className="flex items-center ">
            <div
              className="h-4 w-4 rounded-full border border-white/20 shadow-lg"
              style={{
                backgroundColor: colorMap[color] || '#64748B',
              }}
            />

          </div>
        ))}
      </div>
    </div>
  );
}