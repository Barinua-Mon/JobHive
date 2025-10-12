
import NavBar from './_components/NavBar';
import './globals.css';



export const metadata = {
  title: {
    template: "%s | the jobhive",
    default: "Welcome | the jobhive"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col text-justify min-h-screen relative'>
        <NavBar />
        <main className='pt-16'>
          {children}
        </main>
      </body>
    </html>
  );
}
