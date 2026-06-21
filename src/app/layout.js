import './globals.css';

export const metadata = {
  title: 'Happy Birthday, Papa',
  description: 'A tribute to Pravveen Somani — from his family, with love.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
