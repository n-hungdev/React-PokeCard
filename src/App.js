//import { useEffect, useRef } from 'react'
import PokeCard from './components/PokeCard'

export default function App() {
  return (
    <main id="app">
      <h1>Pokemon Card, Holo Effect</h1>

      <section class="cards">
        <PokeCard />
        <PokeCard className="card pika" />
        <PokeCard className="card eevee" />
        <PokeCard className="card mewtwo" />
      </section>

      {/* <style class="hover" ref={styleRef}></style> */}
      {/* => JSX <style /> */}

      <section class="demo">
        <PokeCard className="card" />
        <span class="operator">+</span>
        <PokeCard className="card">
          <span>color-dodge</span>
        </PokeCard>
        <span class="operator">+</span>
        <PokeCard className="card">
          <span>color-dodge</span>
        </PokeCard>
      </section>
    </main>
  )
}
