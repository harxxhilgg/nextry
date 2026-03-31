import Footer from "@/components/footer/footer";
import TopNav from "@/components/nav/top-nav";
import ColorBends from "@/components/ColorBends";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="fixed inset-0 -z-10 opacity-40">
        <ColorBends
          // colors={['#17153b', '#2e236c', '#433d8b', '#c8acd6']}
          colors={["#ff5c7a", "#8a5cff", "#00ffd1", "#17153b"]}
          transparent={true}
        />
      </div>

      <main className="flex min-h-screen w-full flex-col items-center sm:items-start">
        <div className="w-full sm:max-w-3xl md:max-w-5xl mx-auto sticky top-0 z-50 backdrop-blur-xl rounded-4xl mt-4">
          <TopNav />
        </div>

        <div className="w-full flex my-auto">{children}</div>

        <div className="w-full mt-auto pb-4">
          <Footer />
        </div>
      </main>
    </div>
  );
}
