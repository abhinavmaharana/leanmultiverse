import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/leanmultiverse', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/leanmultiverse', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/leanmultiverse', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/leanmultiverse', label: 'Facebook' },
];

export function NewFooter() {
    return (
        <footer className="w-full bg-amber-400 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo - Using the official logo.svg */}
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.svg"
                            alt="Lean Multiverse"
                            width={140}
                            height={50}
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Copyright */}
                    <p className="text-sm opacity-90">
                        © {new Date().getFullYear()} Lean Multiverse. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                                aria-label={social.label}
                            >
                                <social.icon className="w-4 h-4 text-white" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
