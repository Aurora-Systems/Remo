import type { Metadata } from "next";
import { Footer, Navbar } from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';



export const metadata: Metadata = {
  title: "Remo",
  description: "Redefining the hiring process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
