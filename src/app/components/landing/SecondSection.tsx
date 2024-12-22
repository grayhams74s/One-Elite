import Image from 'next/image'
import { Snowflake, Wind, Sun, Droplets, ChevronRight, Star } from 'lucide-react'

const ServiceCard = ({ icon: Icon, title, description, rating }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <Icon className="w-12 h-12 text-white mb-4" />
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  </div>
)

export default function WashingServices() {
  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-white text-4xl font-bold mb-2">Our Washing Services</h2>
          <p className="text-gray-400 uppercase tracking-wide">WITH MODERN EQUIPMENT</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ServiceCard
            icon={Snowflake}
            title="Contactless Washing"
            description="Vestibulum lorem ipsum, rutrum et risus vel, congue erat ultricies tortor."
            rating={4}
          />
          <ServiceCard
            icon={Wind}
            title="Safety Materials"
            description="Cras ultricies ligula amet, gravida diam vestibulum gravida."
            rating={5}
          />
          <ServiceCard
            icon={Sun}
            title="Modern Equipment"
            description="Fusce imperdiet molestie nisl, ut dapibus nicer vestibulum suscipit."
            rating={4}
          />
          <ServiceCard
            icon={Droplets}
            title="Extensive Cleaning"
            description="Vestibulum non odio sit amet mi malesuada sit non velit."
            rating={5}
          />
        </div>
        <div className="relative">
          <Image
            src="/assets/Mask.png"
            alt="Car headlight"
            width={1200}
            height={400}
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 rounded-lg">
            <h3 className="text-white text-4xl font-bold mb-2">We work with passion.</h3>
            <p className="text-gray-300">
              Our specialists are waiting to give you the treatments and services that you deserve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}