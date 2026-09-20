import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"Byakko Kondo — Engineer / Creative Developer",description:"Digital products, web experiences, research software and automation systems."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}