import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { baseMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = baseMetadata("ja");

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ja">{children}</RootShell>;
}
