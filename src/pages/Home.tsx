import BrandLockup from "@/components/home/BrandLockup"
import LandingActions from "@/components/home/LandingActions"
import officeBg from "../assets/office-bg.jpeg"
import logoNoBg from "../assets/Logo_without_bg.svg"

const Home = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${officeBg})` }}
    >
      <div className="absolute inset-0 bg-[#29255E] opacity-80" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center px-4 text-center text-white">
        <BrandLockup logoSrc={logoNoBg} name="BookIT" />

        <p className="mb-10 text-xl text-gray-200">
          Rezerva-ti locul la birou in cateva secunde. Alege zona,
          etajul si scaunul preferat - totul dintr-o singura aplicatie.
        </p>

        <LandingActions registerTo="/signup" loginTo="/login" />
      </div>
    </div>
  )
}

export default Home
