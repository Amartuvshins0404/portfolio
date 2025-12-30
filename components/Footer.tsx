import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-8 border-t bg-background/50 backdrop-blur-sm">
            <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Amartuvshin Surenjav. All rights reserved.
                </p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </div>
        </footer>
    )
}
