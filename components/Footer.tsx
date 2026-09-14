import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10 border-t bg-background/50 backdrop-blur-sm">
            <div className="container px-4 md:px-6 mx-auto flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Amartuvshin Surenjav.{" "}
                        <span className="hidden sm:inline">Built in Ulaanbaatar, Mongolia.</span>
                    </p>
                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
                            Projects
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blog">
                            Writing
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
