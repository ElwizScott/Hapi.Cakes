export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-gray-800">
            Hapi{" "}
            <span className="text-pink-500 relative">
              Cakes
              <span className="absolute left-0 -bottom-2 w-full h-2 bg-pink-200 -z-10"></span>
            </span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            Custom cakes for birthdays, weddings and special moments.
            Handmade with love and premium ingredients.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Order Now
            </button>

            <button className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-100 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="absolute w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-40"></div>

          <img
            src="https://via.placeholder.com/400x400?text=Cake"
            alt="Featured cake"
            className="relative w-80 drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
