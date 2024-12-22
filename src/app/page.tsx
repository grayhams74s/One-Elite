
import FirstSectionPage from "./components/landing/FirstSection";
import HerosComponent from "./components/landing/Heros";
import WashingServices from "./components/landing/SecondSection";
import ThirdSection from "./components/landing/ThirdSection";
import UpdatedFooter from "./components/landing/UpdatedFooter";


export default function Home() {
  return (
    <div>
      <div className="hidden md:block">
      </div>
      <HerosComponent />
      <FirstSectionPage />
      <WashingServices />
      <ThirdSection />
      <UpdatedFooter />
    </div>
  );
}
