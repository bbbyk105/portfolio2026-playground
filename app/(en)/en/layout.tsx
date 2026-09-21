import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { baseMetadata } from "@/lib/seo";
import "../../globals.css";

export const metadata: Metadata = baseMetadata("en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
