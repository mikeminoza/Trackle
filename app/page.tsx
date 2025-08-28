import Hero from "@/components/hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col gap-20 p-5">
          {/* Hero Section */}
          <section>
            <Hero />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
