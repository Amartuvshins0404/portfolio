"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, ArrowRight, InstagramIcon, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden container mx-auto">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="mx-auto max-w-3xl flex flex-col items-center text-center space-y-8">

                    {/* Cute Handbook/Emoji Element */}
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="text-6xl md:text-7xl mb-4"
                    >
                        👋
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-background to-background/70"
                        >
                            Let's Build Something<br />Amazing Together!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed"
                        >
                            I'm currently available for freelance projects and open source collaborations. If you want a premium website that converts, I'm your guy.
                        </motion.p>
                    </div>

                    {/* Main CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pt-4"
                    >
                        <Button
                            size="lg"
                            className="h-14 px-8 rounded-full text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                            asChild
                        >
                            <Link href="mailto:amaraaamka0404@gmail.com">
                                <Mail className="mr-2 h-5 w-5 text-background" />
                                Hire Me Now
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 pt-8">
                        <SocialButton href="https://github.com/Amartuvshins0404" icon={<Github className="h-5 w-5 text-background" />} label="Github" delay={0.3} />
                        <SocialButton href="https://www.instagram.com/amartovision/" icon={<InstagramIcon className="h-5 w-5 text-background" />} label="LinkedIn" delay={0.4} />
                        <SocialButton href="https://x.com/Amaraa2404" icon={<Twitter className="h-5 w-5 text-background" />} label="Twitter" delay={0.5} />
                    </div>

                    <Link href="tel:+97680360420" className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-background" />
                        <span className="font-bold">+976 8036-0420</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-muted-foreground pt-12"
                    >
                        © {new Date().getFullYear()} Amartuvshin Surenjav. All rights reserved.
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SocialButton({ href, icon, label, delay }: { href: string; icon: React.ReactNode; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
        >
            <Button
                variant="default"
                size="icon"
                className="h-12 w-12 bg-foreground rounded-full"
                asChild
            >
                <Link href={href} aria-label={label} target="_blank">
                    {icon}
                </Link>
            </Button>
        </motion.div>
    );
}
