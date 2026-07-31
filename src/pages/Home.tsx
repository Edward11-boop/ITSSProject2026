import officeBg from '../assets/office-bg.jpeg'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import logo_noBG from "../assets/Logo_without_bg.svg";

const Home = () => {
    return (

        <div
            className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${officeBg})` }}
        >

            <div className="absolute inset-0 bg-[#29255E] opacity-80"></div>


            <div className="relative z-10 flex max-w-2xl flex-col items-center px-4 text-center text-white">


                <div className="flex items-center gap-3 text-64px">
                    <img src={logo_noBG} alt="Logo" className="h-20" />
                    <h1 className="text-[64px] font-semibold text-white">
                        BookIT
                    </h1>
                </div>


                <p className="mb-10 text-xl text-gray-200">
                    Rezerva-ti locul la birou in cateva secunde. Alege zona,
                    etajul si scaunul preferat — totul dintr-o singura aplicatie.
                </p>

                {/* Butoanele */}
                <div className="flex gap-6">
                    <Link
                        to="/signup"
                        className="rounded-lg bg-white px-8 py-3 text-xl font-bold text-[#6D28D9] transition hover:bg-gray-200"
                    >
                        Register
                    </Link>

                    <Link
                        to="/login"
                        className="rounded-lg bg-[#6D28D9] px-8 py-3 text-xl font-bold text-white transition hover:bg-[#5B21B6]"
                    >
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Home