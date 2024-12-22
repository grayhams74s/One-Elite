import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-extrabold mb-4">ONE <span className='text-red-600'>ELITE</span> AUTOMOTIVE</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">PAGE</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-gray-300">Privacy and Cookie Policy</Link></li>
              <li><Link href="/search-terms" className="hover:text-gray-300">Search Terms</Link></li>
              <li><Link href="/orders-returns" className="hover:text-gray-300">Orders and Returns</Link></li>
              <li><Link href="/advanced-search" className="hover:text-gray-300">Advanced Search</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">CAR</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-gray-300">Privacy and Cookie Policy</Link></li>
              <li><Link href="/search-terms" className="hover:text-gray-300">Search Terms</Link></li>
              <li><Link href="/orders-returns" className="hover:text-gray-300">Orders and Returns</Link></li>
              <li><Link href="/advanced-search" className="hover:text-gray-300">Advanced Search</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">SERVICES</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-gray-300">Privacy and Cookie Policy</Link></li>
              <li><Link href="/search-terms" className="hover:text-gray-300">Search Terms</Link></li>
              <li><Link href="/orders-returns" className="hover:text-gray-300">Orders and Returns</Link></li>
              <li><Link href="/advanced-search" className="hover:text-gray-300">Advanced Search</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
            <p>(303) 985-0105, (303) 355 -0105</p>
            <p>1ELITEAutomotive@info.com</p>
            <p>5025 8th 11 Don Mariano Marcos Ave.</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-700">
          <p>&copy;2021 ONE ELITE. All Rights Reserved</p>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" className="hover:text-gray-300">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://facebook.com" className="hover:text-gray-300">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" className="hover:text-gray-300">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}