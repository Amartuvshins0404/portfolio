import fs from "node:fs/promises";
import path from "node:path";

import IdentityGraphAnimated from "@/components/IdentityGraphAnimated";

export default async function IdentityGraph() {
    const svgPath = path.join(process.cwd(), "public", "identity-graph.svg");
    const svg = await fs.readFile(svgPath, "utf8");

    return (
        <section className="relative w-full overflow-hidden py-12 md:py-16">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl text-foreground">
                <IdentityGraphAnimated svg={svg} />
            </div>
        </section>
    );
}
