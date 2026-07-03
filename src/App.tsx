import { lazy, Suspense } from 'react'
import { ToastProvider } from '@/hooks/useToast'
import { ModalProvider } from '@/components/modals/ModalProvider'
import { LeadsInspector } from '@/components/modals/LeadsInspector'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

// Above the fold: eager for LCP.
import { HeroSection } from '@/components/landing/HeroSection'
import { TrustBar } from '@/components/landing/TrustBar'
import { MetricsSection } from '@/components/landing/MetricsSection'

// Below the fold: lazy-loaded chunks.
const ProblemSection = lazy(() => import('@/components/landing/ProblemSection').then((m) => ({ default: m.ProblemSection })))
const SolutionSection = lazy(() => import('@/components/landing/SolutionSection').then((m) => ({ default: m.SolutionSection })))
const MultitenantSection = lazy(() => import('@/components/landing/MultitenantSection').then((m) => ({ default: m.MultitenantSection })))
const FeaturesSection = lazy(() => import('@/components/landing/FeaturesSection').then((m) => ({ default: m.FeaturesSection })))
const ProductShowcase = lazy(() => import('@/components/landing/ProductShowcase').then((m) => ({ default: m.ProductShowcase })))
const BusinessSimulationSection = lazy(() => import('@/components/landing/BusinessSimulationSection').then((m) => ({ default: m.BusinessSimulationSection })))
const OnboardingSection = lazy(() => import('@/components/landing/OnboardingSection').then((m) => ({ default: m.OnboardingSection })))
const BeforeAfterSection = lazy(() => import('@/components/landing/BeforeAfterSection').then((m) => ({ default: m.BeforeAfterSection })))
const ImpactSection = lazy(() => import('@/components/landing/ImpactSection').then((m) => ({ default: m.ImpactSection })))
const PricingSection = lazy(() => import('@/components/landing/PricingSection').then((m) => ({ default: m.PricingSection })))
const PricingComparison = lazy(() => import('@/components/landing/PricingComparison').then((m) => ({ default: m.PricingComparison })))
const PlanCalculator = lazy(() => import('@/components/landing/PlanCalculator').then((m) => ({ default: m.PlanCalculator })))
const SecuritySection = lazy(() => import('@/components/landing/SecuritySection').then((m) => ({ default: m.SecuritySection })))
const PWASection = lazy(() => import('@/components/landing/PWASection').then((m) => ({ default: m.PWASection })))
const IntegrationsSection = lazy(() => import('@/components/landing/IntegrationsSection').then((m) => ({ default: m.IntegrationsSection })))
const IndustriesSection = lazy(() => import('@/components/landing/IndustriesSection').then((m) => ({ default: m.IndustriesSection })))
const BenefitsSection = lazy(() => import('@/components/landing/BenefitsSection').then((m) => ({ default: m.BenefitsSection })))
const TimelineSection = lazy(() => import('@/components/landing/TimelineSection').then((m) => ({ default: m.TimelineSection })))
const TestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })))
const FAQSection = lazy(() => import('@/components/landing/FAQSection').then((m) => ({ default: m.FAQSection })))
const ContactSection = lazy(() => import('@/components/landing/ContactSection').then((m) => ({ default: m.ContactSection })))
const FinalCTASection = lazy(() => import('@/components/landing/FinalCTASection').then((m) => ({ default: m.FinalCTASection })))

/** Reserve space while a lazy section loads to keep CLS near zero. */
function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />
}

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection />
          <TrustBar />
          <MetricsSection />
          <Suspense fallback={<SectionFallback />}>
            <ProblemSection />
            <SolutionSection />
            <MultitenantSection />
            <FeaturesSection />
            <ProductShowcase />
            <BusinessSimulationSection />
            <OnboardingSection />
            <BeforeAfterSection />
            <ImpactSection />
            <PricingSection />
            <PricingComparison />
            <PlanCalculator />
            <SecuritySection />
            <PWASection />
            <IntegrationsSection />
            <IndustriesSection />
            <BenefitsSection />
            <TimelineSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <FinalCTASection />
          </Suspense>
        </main>
        <Footer />
        <FloatingActions />
        <LeadsInspector />
      </ModalProvider>
    </ToastProvider>
  )
}

export default App
