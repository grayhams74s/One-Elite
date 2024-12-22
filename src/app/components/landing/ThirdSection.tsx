import { ChevronRight, Droplets, Sparkles, Wind } from 'lucide-react'
import Image from 'next/image'


const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <Icon className="w-12 h-12 mb-4 text-gray-800" />
    <h3 className="text-lg font-semibold mb-2 text-red-500">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const TestimonialCard = ({ name, image, testimonial }) => (
  <div className="flex flex-col items-center text-center max-w-md mx-auto">
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-full mb-3 border-4 border-white shadow-lg object-cover"
      />
      <p className="font-semibold text-red-500 text-lg">{name}</p>
    </div>
    <p className="text-gray-600 leading-relaxed italic">"{testimonial}"</p>
  </div>
)

export default function ThirdSection() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Droplets}
            title="Natural Cleaners"
            description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
          />
          <ServiceCard
            icon={Sparkles}
            title="Heightened care"
            description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
          />
          <ServiceCard
            icon={Wind}
            title="Aromatization"
            description="Vivamus hendrerit arcu non efficitur fermentum, purus lorem."
          />
        </div>
        <div className="flex justify-end mt-4">
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">What our clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            name="Esther Howard"
            image="/assets/client1.jpg"
            testimonial="We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product."
          />
          <TestimonialCard
            name="Ralph Edwards"
            image="/assets/client2.jpg"
            testimonial="Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future."
          />
        </div>
      </section>
    </div>
  )
}