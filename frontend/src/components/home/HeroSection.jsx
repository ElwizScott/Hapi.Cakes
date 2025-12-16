export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-3xl bg-gradient-to-r from-hapi-light to-hapi-pink/30 p-12 shadow-sm">

        {/* LEFT */}
        <div>
          <h1 className="font-serif text-5xl leading-tight">
            <span className="text-slate-800">Hapi</span>{" "}
            <span className="text-hapi-pink">Cakes</span>
          </h1>

          <p className="mt-6 text-lg max-w-md">
            Custom cakes for birthdays, weddings and special moments.
            Handmade with love and premium ingredients.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-black px-8 py-3 text-white hover:opacity-90">
              Order Now
            </button>

            <button className="rounded-full border-2 border-hapi-pink px-8 py-3 text-hapi-pink hover:bg-hapi-pink hover:text-white transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="rounded-2xl bg-gradient-to-br from-hapi-pink to-hapi-purple h-80 flex items-center justify-center text-black text-xl font-serif opacity-90">
            Featured Cake
          </div>
        </div>

      </div>
    </section>
  );
}
