import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"Byakko Kondo — Creative Developer",description:"Engineer and creative developer building digital products, web experiences and automation systems."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}