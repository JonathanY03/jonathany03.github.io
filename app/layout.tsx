import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "@/app/globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jonathan Yu",
	description: "This is my personal website.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head />
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
