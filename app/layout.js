import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Reflct",
  description: "A Journaliong App",
};

export default function RootLayout({ children }) {
  return ( 
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0" />

        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster richColors />
        <footer className="bg-orange-300 py-12 bg-opacity-10">
          <div className="mx-auto px-4 text-center text-gray-900">
            <p>Made With 💜 by Shreyash Bhise</p>
          </div>
        </footer>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
