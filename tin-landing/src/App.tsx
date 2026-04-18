import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { ProductsEcosystem } from './components/sections/ProductsEcosystem'
import { PaymentMethods } from './components/sections/PaymentMethods'

function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ProductsEcosystem />
        <PaymentMethods />
      </main>
    </>
  )
}

export default App
