import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10 border-t bg-background/50 backdrop-blur-sm">
            <div className="container px-4 md:px-6 mx-auto flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Amartuvshin Surenjav.{" "}
                        <span className="hidden sm:inline">Website hiine · Веб сайт хийх · Ulaanbaatar, Mongolia.</span>
                    </p>
                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#services">
                            Services
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
                            FAQ
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
                            Contact
                        </Link>
                    </nav>
                </div>
                <p className="text-xs text-muted-foreground/70 text-center sm:text-left max-w-3xl">
                    Freelance website development from Ulaanbaatar, Mongolia · Веб сайт хийнэ, web hogjuuleh, AI agentic workflow engineering. Next.js, React, TypeScript. Хямд, хурдан, найдвартай.
                </p>
            </div>
        </footer>
    )
}
