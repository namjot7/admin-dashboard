import "./globals.css";
import SessionWrapper from "@/app/components/SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Online Store</title>
      </head>
      {/* Create a separate "Client" component */}
      <SessionWrapper>
        <body>{children}</body>
      </SessionWrapper>

      {/* or just make this "Client" */}
      {/* <SessionProvider>
        <body>{children}</body>
      </SessionProvider> */}
    </html>
  );
}
