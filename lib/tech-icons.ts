import {
  siAnthropic,
  siApollographql,
  siClaude,
  siElasticsearch,
  siExpress,
  siFramer,
  siGithub,
  siGraphql,
  siJsonwebtokens,
  siMinio,
  siModelcontextprotocol,
  siMongodb,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOwasp,
  siPostgresql,
  siReact,
  siRedis,
  siShadcnui,
  siTailwindcss,
  siTrpc,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import {
  Bug,
  Code2,
  Layers,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type TechIconRef =
  | { kind: "brand"; title: string; path: string; hex: string }
  | { kind: "lucide"; Icon: LucideIcon };

const NEAR_BLACK_HEXES = new Set([
  "000000",
  "0A0A0A",
  "181717",
  "191919",
  "263238",
]);

export function isNearBlack(hex: string): boolean {
  return NEAR_BLACK_HEXES.has(hex.toUpperCase());
}

function brand(icon: SimpleIcon): TechIconRef {
  return {
    kind: "brand",
    title: icon.title,
    path: icon.path,
    hex: icon.hex,
  };
}

const TECH_ICONS: Record<string, TechIconRef> = {
  "Next.js 16": brand(siNextdotjs),
  "React 19": brand(siReact),
  TypeScript: brand(siTypescript),
  "Tailwind v4": brand(siTailwindcss),
  "Framer Motion": brand(siFramer),
  "Shadcn UI": brand(siShadcnui),
  "Node.js": brand(siNodedotjs),
  Express: brand(siExpress),
  "GraphQL Federation": brand(siGraphql),
  tRPC: brand(siTrpc),
  "Apollo Server": brand(siApollographql),
  BullMQ: { kind: "lucide", Icon: Layers },
  "MongoDB / Mongoose": brand(siMongodb),
  PostgreSQL: brand(siPostgresql),
  Redis: brand(siRedis),
  Elasticsearch: brand(siElasticsearch),
  "MinIO / S3": brand(siMinio),
  "Application Security": { kind: "lucide", Icon: ShieldCheck },
  "OWASP / SAST": brand(siOwasp),
  CodeQL: brand(siGithub),
  "Vulnerability Triage": { kind: "lucide", Icon: Bug },
  "JWT · OAuth": brand(siJsonwebtokens),
  "Claude Code": brand(siClaude),
  "Custom MCP Servers": brand(siModelcontextprotocol),
  "OpenAI / Anthropic SDK": brand(siAnthropic),
  n8n: brand(siN8n),
  "Agentic Workflows": { kind: "lucide", Icon: Workflow },
};

export function getTechIcon(name: string): TechIconRef {
  return TECH_ICONS[name] ?? { kind: "lucide", Icon: Code2 };
}
