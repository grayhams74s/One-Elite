import Image from 'next/image'

export default function FirstSectionPage() {
  return (
    <div className="container mx-auto px-24 py-8">
      <section className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Washing<br />And Cleaning.
          </h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          </p>
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-6 py-2 rounded-md">
              +63-917-555-5555
            </button>
            <button className="text-gray-700 font-semibold">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="w-full h-80 md:h-96 relative overflow-hidden rounded-tl-full">
            <Image
              src="/assets/onecars.jpg"
              alt="Car being cleaned"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <div className="w-64 h-64 relative overflow-hidden rounded-[50%_50%_30%_70%]">
            <Image
            src="/assets/earlnucum.jpg"
            alt="Earl Nucom"
            layout="fill"
            objectFit="cover"
            />
        </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">Who We Are?</h2>
          <p className="text-gray-600 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className="flex items-start mb-4">
            <blockquote className="text-gray-700 italic">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </blockquote>
          </div>
          <div className="text-gray-700 font-semibold">
            EARL NUCOM
            <span className="block text-sm text-gray-500">FOUNDER & CEO</span>
          </div>
        </div>
      </section>
    </div>
  )
}