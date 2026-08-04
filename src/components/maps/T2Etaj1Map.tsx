import { useState } from 'react'
import SingleSeat from './SingleSeat'

const T2Etaj1Map = () => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const handleSeatClick = (id: string) => {
    if (id.includes('T2-404')){
      setActiveGroup('G-404')
    } else {
      setActiveGroup(id)
    }
  }

  const getSelectedState = (id: string) => {
    if (activeGroup === 'G-404' && (id.includes('T2-404'))) return id
    return activeGroup === id ? id : null
  }

  return (
    <div className="relative mx-auto h-[650px] w-full max-w-[1000px] border border-gray-800 bg-[#F5F3FF] overflow-hidden shadow-sm">
      {/* Camera 404 */}
      <div className="absolute left-0 top-0 h-[470px] w-[190px] border-b border-r border-gray-800">
        <h3 className="absolute left-3 top-3 text-lg font-semibold text-[#29255E]">
          404
        </h3>

        <div className="absolute left-[20px] top-0 h-full w-full">
          <div className="absolute left-[48px] top-[130px] h-[180px] w-[75px] bg-[#C4C4C4]" />

          <SingleSeat
            id="T2-404-01"
            number="1"
            status="available"
            selectedSeat={getSelectedState('T2-404-01')}
            onSelect={handleSeatClick}
            className="left-[68px] top-[90px]"
          />
          <SingleSeat
            id="T2-404-02"
            number="2"
            status="available"
            selectedSeat={getSelectedState('T2-404-02')}
            onSelect={handleSeatClick}
            className="left-[10px] top-[130px]"
          />
          <SingleSeat
            id="T2-404-03"
            number="3"
            status="available"
            selectedSeat={getSelectedState('T2-404-03')}
            onSelect={handleSeatClick}
            className="left-[10px] top-[180px]"
          />
          <SingleSeat
            id="T2-404-04"
            number="4"
            status="available"
            selectedSeat={getSelectedState('T2-404-04')}
            onSelect={handleSeatClick}
            className="left-[10px] top-[230px]"
          />
          <SingleSeat
            id="T2-404-05"
            number="5"
            status="available"
            selectedSeat={getSelectedState('T2-404-05')}
            onSelect={handleSeatClick}
            className="left-[10px] top-[280px]"
          />
          <SingleSeat
            id="T2-404-06"
            number="6"
            status="available"
            selectedSeat={getSelectedState('T2-404-06')}
            onSelect={handleSeatClick}
            className="left-[68px] top-[320px]"
          />
          <SingleSeat
            id="T2-404-07"
            number="7"
            status="available"
            selectedSeat={getSelectedState('T2-404-07')}
            onSelect={handleSeatClick}
            className="left-[130px] top-[280px]"
          />
          <SingleSeat
            id="T2-404-08"
            number="8"
            status="available"
            selectedSeat={getSelectedState('T2-404-08')}
            onSelect={handleSeatClick}
            className="left-[130px] top-[230px]"
          />
          <SingleSeat
            id="T2-404-09"
            number="9"
            status="available"
            selectedSeat={getSelectedState('T2-404-09')}
            onSelect={handleSeatClick}
            className="left-[130px] top-[180px]"
          />
          <SingleSeat
            id="T2-404-10"
            number="10"
            status="available"
            selectedSeat={getSelectedState('T2-404-10')}
            onSelect={handleSeatClick}
            className="left-[130px] top-[130px]"
          />
        </div>

        <div className="absolute left-0 top-[470px] h-[1px] w-[220px] origin-left rotate-[55deg] bg-gray-800" />
      </div>

      <h3 className="absolute left-[550px] top-4 text-lg font-semibold leading-tight text-[#29255E]">
        Sala
        <br />
        birouri
        <br />
        B1
      </h3>

        <div className="absolute left-[300px] top-[80px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[300px] top-[175px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[300px] top-[270px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[300px] top-[365px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[300px] top-[460px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[300px] top-[560px] h-[50px] w-[170px] bg-[#C4C4C4]" />
    
        <div className="absolute left-[700px] top-[80px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[700px] top-[175px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[700px] top-[270px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[700px] top-[365px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[700px] top-[460px] h-[50px] w-[170px] bg-[#C4C4C4]" />
        <div className="absolute left-[700px] top-[560px] h-[50px] w-[170px] bg-[#C4C4C4]" />

        <SingleSeat
        id="T2-B1-09"
        number="9"
        status="available"
        selectedSeat={getSelectedState("T2-B1-09")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[40px]"
        />

        <SingleSeat
        id="T2-B1-10"
        number="10"
        status="available"
        selectedSeat={getSelectedState("T2-B1-10")}
        onSelect={handleSeatClick}
        className="left-[405px] top-[40px]"
        />

        {/* Masa 2 */}
        <SingleSeat
        id="T2-B1-07"
        number="7"
        status="available"
        selectedSeat={getSelectedState("T2-B1-07")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[135px]"
        />

        <SingleSeat
        id="T2-B1-08"
        number="8"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-08")}
        onSelect={handleSeatClick}
        className="left-[405px] top-[135px]"
        />

        {/* Masa 3 */}
        <SingleSeat
        id="T2-B1-05"
        number="5"
        status="available"
        selectedSeat={getSelectedState("T2-B1-05")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[230px]"
        />

        <SingleSeat
        id="T2-B1-06"
        number="6"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-06")}
        onSelect={handleSeatClick}
        className="left-[405px] top-[230px]"
        />

        {/* Masa 4 */}
        <SingleSeat
        id="T2-B1-04"
        number="4"
        status="available"
        selectedSeat={getSelectedState("T2-B1-04")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[325px]"
        />

        {/* Masa 5 */}
        <SingleSeat
        id="T2-B1-03"
        number="3"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-03")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[420px]"
        />

        {/* Masa 6 */}
        <SingleSeat
        id="T2-B1-01"
        number="1"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-01")}
        onSelect={handleSeatClick}
        className="left-[325px] top-[520px]"
        />

        <SingleSeat
        id="T2-B1-02"
        number="2"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-02")}
        onSelect={handleSeatClick}
        className="left-[405px] top-[520px]"
        />   

        {/* Masa 1 */}
        <SingleSeat
        id="T2-B1-18"
        number="18"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-18")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[40px]"
        />

        {/* Masa 2 */}
        <SingleSeat
        id="T2-B1-17"
        number="17"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-17")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[135px]"
        />

        {/* Masa 3 */}
        <SingleSeat
        id="T2-B1-16"
        number="16"
        status="available"
        selectedSeat={getSelectedState("T2-B1-16")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[230px]"
        />

        {/* Masa 4 */}
        <SingleSeat
        id="T2-B1-14"
        number="14"
        status="available"
        selectedSeat={getSelectedState("T2-B1-14")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[325px]"
        />

        <SingleSeat
        id="T2-B1-15"
        number="15"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-15")}
        onSelect={handleSeatClick}
        className="left-[805px] top-[325px]"
        />

        {/* Masa 5 */}
        <SingleSeat
        id="T2-B1-12"
        number="12"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-12")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[420px]"
        />

        <SingleSeat
        id="T2-B1-13"
        number="13"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-13")}
        onSelect={handleSeatClick}
        className="left-[805px] top-[420px]"
        />

        {/* Masa 6 */}
        <SingleSeat
        id="T2-B1-11"
        number="11"
        status="occupied"
        selectedSeat={getSelectedState("T2-B1-11")}
        onSelect={handleSeatClick}
        className="left-[725px] top-[520px]"
        />
    </div>
  )
}

export default T2Etaj1Map





