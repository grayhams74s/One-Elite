import Image from "next/image"
import { Button } from "@/components/ui/button"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const carObjects = [
    { Name: 'Car Wash', Img: '/assets/images/carSlider/car01.png' },
    { Name: 'Auto Detailing', Img: '/assets/images/carSlider/car02.png' },
    { Name: 'Change Oil', Img: '/assets/images/carSlider/car03.png' },
  ];

export default function HeroSectionComponent() {
  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto p-4 mt-12">
        <section className="flex justify-between items-center mb-12 gap-x-24 flex-col-reverse md:flex-row">
          <div className="w-3/5">
            <h1 className="text-4xl font-extrabold mb-4 text-center md:text-left mt-10 md:mt-0">
              Explore the Finest
              <span className="text-red-600"> Global Offers</span>
            </h1>
            <p className="text-gray-600 mb-4 text-light text-center md:text-left">
              Find your ideal ride for any adventure with our diverse range of affordable and dependable car rentals.
            </p>
            <div className="flex space-x-4 mb-4 items-center justify-center md:items-start md:justify-start">
                <Button className="bg-white text-black">Sign Up</Button>
                <Button className="bg-red-500 text-white hover:bg-red-400">Book Now</Button>
            </div>
          </div>
          <div className="w-1/2">
            <Image src="/assets/images/hero/car.svg" width={500} height={300} alt="Red Car" className="rounded-lg" />
          </div>
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            {['/assets/icons/brands/mercedes.svg', '/assets/icons/brands/skoda.svg', '/assets/icons/brands/vw.svg','/assets/icons/brands/audi.svg', '/assets/icons/brands/ford.svg', '/assets/icons/brands/ford.svg', '/assets/icons/brands/ford.svg'].map((brand) => (
              <Image key={brand} src={brand} width={50} height={50} alt={brand} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8 mt-10">
            {carObjects.map((car) => (
              <div key={car.Name} className="shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
                <Image src={car.Img} width={250} height={150} alt={car.Name} className="mb-4 rounded-lg" />
                <h3 className="font-bold mb-2">{car.Name}</h3>
                <div className="flex justify-between mb-4 gap-x-2">
                  {['Manual', 'Petrol', '5 Seats', 'Air Conditioning', 'Bluetooth'].map((feature) => (
                    <span key={feature} className="text-xs bg-gray-200 rounded-full px-2 py-1">{feature}</span>
                  ))}
                </div>
                <Button className="w-full bg-red-600 text-white hover:bg-red-500">See Details</Button>
              </div>
            ))}
          </div>
        </section>
        <section className="flex justify-between items-center mx-auto mt-24">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Car services simplified.</h2>
            <p className="text-gray-600 mb-4">
              Rent, choose and repair with ease. Our convenient locations, diverse car types and reliable repair service make it easy.
            </p>
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">0+</div>
                <div className="text-sm text-gray-600">Car Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-600">Rental Outlets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-600">Repair Shop</div>
              </div>
            </div>
            <Button className="bg-red-600 text-white">See All Cars</Button>
          </div>
          <div className="w-1/2">
            <Image src="/assets/images/why/car.svg" width={500} height={300} alt="Car Service" className="rounded-lg" />
          </div>
        </section>
      </main>
    </div>
  )
}