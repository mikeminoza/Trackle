import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="w-full flex-1 flex flex-col items-center justify-center max-w-7xl p-5">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
