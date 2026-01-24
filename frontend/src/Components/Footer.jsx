function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-[#0f172a] to-[#020617] text-gray-300">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide mb-3">
            CivicFlow
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            A transparent and efficient platform to submit, track, and resolve
            public grievances with accountability.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-700 pb-2 w-fit">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-white transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-700 pb-2 w-fit">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="hover:text-white transition">
              📧 support@civicflow.gov
            </p>
            <p className="hover:text-white transition">
              📞 +91 7983103715
            </p>
            <p className="hover:text-white transition">
              🏛️ Government of India
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} CivicFlow. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;