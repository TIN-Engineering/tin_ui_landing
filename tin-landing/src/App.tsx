import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { ValuePillars } from './components/sections/ValuePillars'
import { ProductsEcosystem } from './components/sections/ProductsEcosystem'
import { PaymentMethods } from './components/sections/PaymentMethods'
import { FeatureSpotlights } from './components/sections/FeatureSpotlights'
import { PricingPreview } from './components/sections/PricingPreview'
import { SecurityCompliance } from './components/sections/SecurityCompliance'
import { Testimonials } from './components/sections/Testimonials'
import { DarkCtaBand } from './components/sections/DarkCtaBand'

function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ValuePillars />
        <ProductsEcosystem />
        <PaymentMethods />
        <FeatureSpotlights />
        <PricingPreview />
        <SecurityCompliance />
        <Testimonials />
        <DarkCtaBand />
      </main>
      <Footer />
    </>
  )
}

export default App
