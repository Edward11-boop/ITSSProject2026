import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'

const Home = () => {
    return (

        <div
            className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
        >

            <div className="absolute inset-0 bg-[#312E81] opacity-80"></div>


            <div className="relative z-10 flex max-w-2xl flex-col items-center px-4 text-center text-white">


                <h1 className="mb-6 flex items-center gap-3 text-6xl font-bold">

                    <span className="text-4xl">💺</span> BookIT
                </h1>


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