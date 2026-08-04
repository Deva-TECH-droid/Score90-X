import {
  Trophy,
  Goal,
  Users,
  BarChart3,
  CalendarDays,
  ShieldCheck,
  Globe,
  Zap,
  MonitorSmartphone,
  Database,
  Cpu,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      title: "Live Match Coverage",
      icon: Goal,
      description:
        "Follow every FIFA World Cup match with real-time scores, match status, and live updates.",
    },
    {
      title: "Knockout Bracket",
      icon: Trophy,
      description:
        "Explore the complete tournament bracket from the Round of 32 to the World Cup Final.",
    },
    {
      title: "Group Standings",
      icon: BarChart3,
      description:
        "Track points, goal difference, wins, losses, and team rankings throughout the tournament.",
    },
    {
      title: "Teams & Players",
      icon: Users,
      description:
        "Discover national teams, player profiles, statistics, and tournament performance.",
    },
    {
      title: "Match Schedule",
      icon: CalendarDays,
      description:
        "Stay informed with upcoming fixtures, kickoff times, venues, and completed matches.",
    },
    {
      title: "Reliable Statistics",
      icon: ShieldCheck,
      description:
        "Comprehensive football data presented with accuracy and a clean user experience.",
    },
  ];

  const technologies = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "TanStack Query",
    "Framer Motion",
    "Node.js",
    "REST API",
  ];

  return (
    <main className="bg-[#020817] text-white">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            <Sparkles size={16} />
            FIFA World Cup 2026 Platform
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Score90X
            </span>
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-300">
            Score90X is a modern football platform dedicated to delivering
            complete coverage of the FIFA World Cup 2026. Designed with speed,
            simplicity, and beautiful user experience in mind, Score90X allows
            football fans to explore live matches, fixtures, standings,
            knockout brackets, player statistics, and tournament insights in
            one place.
          </p>

        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
            <Globe className="mb-5 text-blue-400" size={40} />
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>

            <p className="text-slate-300 leading-8">
              To provide football fans with accurate, fast, and comprehensive
              FIFA World Cup information through an intuitive digital
              experience.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
            <Zap className="mb-5 text-yellow-400" size={40} />

            <h2 className="mb-4 text-2xl font-bold">
              Our Vision
            </h2>

            <p className="text-slate-300 leading-8">
              To become one of the most trusted football platforms for
              international tournaments by combining reliable data with modern
              technology and elegant design.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
            <MonitorSmartphone className="mb-5 text-cyan-400" size={40} />

            <h2 className="mb-4 text-2xl font-bold">
              User Experience
            </h2>

            <p className="text-slate-300 leading-8">
              Every screen is designed for desktop, tablet, and mobile users,
              ensuring a fast, responsive, and enjoyable football experience.
            </p>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="border-y border-slate-800 bg-slate-900/30">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <h2 className="text-center text-4xl font-black">
            Platform Features
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-400">
            Everything you need to follow the FIFA World Cup from kickoff to
            the final whistle.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-800 bg-[#081122] p-8 transition hover:border-blue-500/40"
                >
                  <Icon className="mb-5 text-blue-400" size={36} />

                  <h3 className="mb-4 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* Technology */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-2">

          <div>

            <h2 className="text-4xl font-black">
              Built With Modern Technology
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Score90X is powered by modern web technologies to ensure
              reliability, performance, scalability, and an exceptional user
              experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">

              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm"
                >
                  {tech}
                </span>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">

            <div className="space-y-8">

              <div className="flex gap-4">
                <Cpu className="text-blue-400" />
                <div>
                  <h3 className="font-bold">High Performance</h3>
                  <p className="text-slate-400">
                    Optimized for fast loading and smooth navigation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Database className="text-green-400" />
                <div>
                  <h3 className="font-bold">Reliable Football Data</h3>
                  <p className="text-slate-400">
                    Tournament information is delivered through structured APIs
                    for accurate match and competition data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="text-yellow-400" />
                <div>
                  <h3 className="font-bold">Modern Design</h3>
                  <p className="text-slate-400">
                    Built with accessibility, responsiveness, and premium UI
                    principles.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <section className="border-t border-slate-800">

        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <Trophy className="mx-auto mb-6 text-blue-400" size={56} />

          <h2 className="text-4xl font-black">
            Thank You For Visiting Score90X
          </h2>

          <p className="mx-auto mt-8 max-w-3xl leading-8 text-slate-400">
            Whether you're following your favorite national team, checking live
            scores, exploring tournament statistics, or tracking the knockout
            bracket, Score90X is here to make your FIFA World Cup experience
            faster, simpler, and more enjoyable.
          </p>

          <p className="mt-10 text-xl font-semibold text-blue-400">
            Every Match. Every Goal. Every Moment.
          </p>

        </div>

      </section>
    </main>
  );
}