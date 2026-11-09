import { TechIcon } from "@/components/tech-icon";
import type { CMSSiteSettings, CMSSkill } from "@/lib/cms";

export default function TechStack({
  skills,
  settings,
}: {
  skills: CMSSkill[];
  settings: CMSSiteSettings | null;
}) {
  if (skills.length === 0) return null;

  const items = (labelled: boolean) =>
    skills.map((skill) => (
      <li
        key={skill.id}
        title={skill.name}
        className="flex h-10 items-center opacity-80 transition-opacity hover:opacity-100"
      >
        <TechIcon name={skill.name} className="h-8 w-8" />
        {labelled ? <span className="sr-only">{skill.name}</span> : null}
      </li>
    ));

  return (
    <section
      id="skills"
      aria-label={settings?.about_tech_stack_label ?? "Tech Stack"}
      className="card-surface scroll-mt-[35vh] overflow-hidden py-6"
    >
      <div className="marquee-mask flex overflow-hidden [&:hover_ul]:[animation-play-state:paused]">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none">
          {items(true)}
        </ul>
        <ul
          aria-hidden="true"
          className="animate-marquee flex shrink-0 items-center gap-10 pr-10 motion-reduce:hidden"
        >
          {items(false)}
        </ul>
      </div>
    </section>
  );
}
