import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { Info, AlertTriangle, CheckCircle2, XCircle, Sparkles, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { directusAssetUrl, directusOrigin } from "@/lib/directus";

type Props = { content: string };

type BlockSegment = {
  kind: "block";
  name: string;
  props: Record<string, string>;
  body: string;
};
type MdSegment = { kind: "md"; text: string };
type Segment = BlockSegment | MdSegment;

const PROP_RE = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
function parseProps(propsStr: string): Record<string, string> {
  const props: Record<string, string> = {};
  if (!propsStr) return props;
  let m: RegExpExecArray | null;
  PROP_RE.lastIndex = 0;
  while ((m = PROP_RE.exec(propsStr)) !== null) {
    props[m[1]] = m[2];
  }
  return props;
}

function resolveBindings(text: string): string {
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, expr) => {
    const fallback = String(expr).match(/\|\|\s*"([^"]*)"/);
    return fallback ? fallback[1] : "";
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMdcToHtml(text: string): string {
  return text.replace(
    /:(\w[\w-]*)\{([^}]*)\}/g,
    (_, name: string, propsStr: string) => {
      const props = parseProps(propsStr);
      const propsJson = escapeHtml(JSON.stringify(props));
      return `<span data-mdc-inline="${escapeHtml(name)}" data-mdc-props="${propsJson}"></span>`;
    },
  );
}

function splitSegments(content: string): Segment[] {
  const lines = content.split("\n");
  const segs: Segment[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) {
      segs.push({ kind: "md", text: buf.join("\n") });
      buf = [];
    }
  };
  let i = 0;
  while (i < lines.length) {
    const open = lines[i].match(/^::(\w[\w-]*)(?:\{([^}]*)\})?\s*$/);
    if (open) {
      const [, name, propsStr = ""] = open;
      let j = i + 1;
      const body: string[] = [];
      let closed = false;
      while (j < lines.length) {
        if (/^::\s*$/.test(lines[j])) {
          closed = true;
          break;
        }
        body.push(lines[j]);
        j++;
      }
      if (closed) {
        flush();
        segs.push({
          kind: "block",
          name,
          props: parseProps(propsStr),
          body: body.join("\n"),
        });
        i = j + 1;
        continue;
      }
    }
    buf.push(lines[i]);
    i++;
  }
  flush();
  return segs;
}

const ALERT_STYLES: Record<
  string,
  { ring: string; bg: string; icon: typeof Info; iconClass: string; label: string }
> = {
  info: {
    ring: "border-sky-500/30",
    bg: "bg-sky-500/[0.06]",
    icon: Info,
    iconClass: "text-sky-500",
    label: "Note",
  },
  success: {
    ring: "border-emerald-500/30",
    bg: "bg-emerald-500/[0.06]",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    label: "Success",
  },
  warning: {
    ring: "border-amber-500/30",
    bg: "bg-amber-500/[0.06]",
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    label: "Warning",
  },
  danger: {
    ring: "border-rose-500/30",
    bg: "bg-rose-500/[0.06]",
    icon: XCircle,
    iconClass: "text-rose-500",
    label: "Caution",
  },
};

function AlertBlock({ type = "info", title, body }: { type?: string; title?: string; body: string }) {
  const style = ALERT_STYLES[type] ?? ALERT_STYLES.info;
  const Icon = style.icon;
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-2xl border p-5 md:p-6",
        style.ring,
        style.bg,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", style.iconClass)} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
            {title ?? style.label}
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed">
            <Markdown content={body} />
          </div>
        </div>
      </div>
    </aside>
  );
}

function CalloutBlock({ body, icon }: { body: string; icon?: string }) {
  return (
    <aside className="not-prose my-6 rounded-2xl border border-border/40 bg-muted/30 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed">
          <Markdown content={body} />
        </div>
        {icon ? <span className="sr-only">{icon}</span> : null}
      </div>
    </aside>
  );
}

function QuoteBlock({ body, author }: { body: string; author?: string }) {
  return (
    <figure className="not-prose my-8">
      <Quote className="h-6 w-6 text-muted-foreground/50" />
      <blockquote className="mt-3 text-xl md:text-2xl font-medium leading-snug tracking-tight">
        <div className="prose prose-lg dark:prose-invert max-w-none [&>p]:m-0">
          <Markdown content={body} />
        </div>
      </blockquote>
      {author ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          — {author}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ImageBlock({ src, alt, caption, width, height }: { src?: string; alt?: string; caption?: string; width?: string; height?: string }) {
  if (!src) return null;
  const resolved = resolveImageSrc(src);
  const w = width ? Number(width) : 1600;
  const h = height ? Number(height) : 900;
  return (
    <figure className="not-prose my-8">
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
        <Image
          src={resolved}
          alt={alt ?? caption ?? ""}
          width={w}
          height={h}
          sizes="(max-width: 768px) 100vw, 800px"
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function resolveImageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  // Looks like a Directus asset UUID
  if (/^[0-9a-f-]{36}$/i.test(src)) {
    return directusAssetUrl(src, { width: 1600, quality: 85 }) ?? src;
  }
  if (src.startsWith("/assets/")) {
    return `${directusOrigin()}${src}`;
  }
  return src;
}

function InlineIcon({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground border border-border/30">
      <Sparkles className="h-3 w-3" />
      {name}
    </span>
  );
}

type SpanProps = React.HTMLAttributes<HTMLSpanElement> & {
  "data-mdc-inline"?: string;
  "data-mdc-props"?: string;
};

function Markdown({ content }: { content: string }) {
  const prepared = inlineMdcToHtml(resolveBindings(content));
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        a({ href, children, ...rest }) {
          const isExternal = href?.startsWith("http") || href?.startsWith("//");
          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                {...rest}
              >
                {children}
              </a>
            );
          }
          return (
            <Link
              href={href ?? "#"}
              className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              {children}
            </Link>
          );
        },
        img({ src, alt }) {
          if (!src || typeof src !== "string") return null;
          const resolved = resolveImageSrc(src);
          return (
            <span className="not-prose my-6 block">
              <span className="relative block overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                <Image
                  src={resolved}
                  alt={alt ?? ""}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="h-auto w-full object-cover"
                />
              </span>
              {alt ? (
                <span className="mt-3 block text-center text-sm text-muted-foreground">
                  {alt}
                </span>
              ) : null}
            </span>
          );
        },
        span(props: SpanProps) {
          const inline = props["data-mdc-inline"];
          if (inline === "icon") {
            try {
              const parsed = props["data-mdc-props"]
                ? (JSON.parse(props["data-mdc-props"]) as Record<string, string>)
                : {};
              return <InlineIcon name={parsed.name ?? "icon"} />;
            } catch {
              return null;
            }
          }
          const { "data-mdc-inline": _i, "data-mdc-props": _p, ...rest } = props;
          return <span {...rest} />;
        },
      }}
    >
      {prepared}
    </ReactMarkdown>
  );
}

export default function MdcRenderer({ content }: Props) {
  const segments = splitSegments(content ?? "");
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none min-w-0 break-words prose-headings:tracking-tight prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-foreground/85 prose-li:text-foreground/85 prose-pre:rounded-xl prose-pre:border prose-pre:border-border/40 prose-pre:bg-muted/40 prose-pre:overflow-x-auto prose-pre:max-w-full prose-code:before:hidden prose-code:after:hidden prose-code:rounded prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-blockquote:border-l-2 prose-blockquote:border-foreground/20 prose-blockquote:not-italic prose-blockquote:text-foreground/80">
      {segments.map((seg, i) => {
        if (seg.kind === "md") {
          return <Markdown key={i} content={seg.text} />;
        }
        switch (seg.name) {
          case "alert":
            return (
              <AlertBlock
                key={i}
                type={seg.props.type}
                title={seg.props.title}
                body={seg.body}
              />
            );
          case "callout":
            return <CalloutBlock key={i} body={seg.body} icon={seg.props.icon} />;
          case "quote":
            return <QuoteBlock key={i} body={seg.body} author={seg.props.author} />;
          case "image":
          case "img":
            return (
              <ImageBlock
                key={i}
                src={seg.props.src}
                alt={seg.props.alt}
                caption={seg.props.caption}
                width={seg.props.width}
                height={seg.props.height}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
