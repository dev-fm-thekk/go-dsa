import Hero from "./components/Hero";
import MobileStatsCard from "./components/MobileStatsCard";

export default function Home() {
  return (
    <div>
      <section>
        <div className="mt-4 mb-2">
          <MobileStatsCard />
        </div>
        <Hero />
      </section>
    </div>
  );
}
