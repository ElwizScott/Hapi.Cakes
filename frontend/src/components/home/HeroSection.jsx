import AdminImageEditOverlay from "../../features/admin/components/AdminImageEditOverlay";

export default function HeroSection({
  featuredImageUrl,
  isAdmin,
  onFeaturedImageUploaded,
}) {
  return (
    <section className="mx-auto max-w-7xl px-8 py-16">
      {/* Subtle cream stroke to separate hero from the page background. */}
      <div className="rounded-[2rem] border border-brandCream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-3xl bg-gradient-to-br from-softBg to-lavender p-12 shadow-sm">
          {/* LEFT */}
          <div>
            <h1 className="font-script text-5xl leading-tight text-plum">
              Hapi.Cakes
            </h1>

            <p className="mt-6 text-lg font-serif max-w-md text-muted">
              Custom cakes for birthdays, weddings and special moments. Handmade
              with love and premium ingredients.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-full font-serif bg-brandPink px-8 py-3 text-white shadow-sm hover:bg-brandPink/90">
                Order Now
              </button>

              <button className="rounded-full font-serif border-2 border-brandPink px-8 py-3 text-brandPink transition hover:bg-brandPink hover:text-white">
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative group">
            {/* Soft hover motion to make the featured cake feel alive without shouting. */}
            <div className="rounded-2xl bg-white border border-lavender h-80 flex items-center justify-center text-plum text-xl font-serif shadow-[0_12px_30px_rgba(200,141,191,0.2)] overflow-hidden transition-shadow duration-[600ms] ease-out group-hover:shadow-[0_16px_40px_rgba(200,141,191,0.25)]">
              {featuredImageUrl ? (
                <img
                  src={featuredImageUrl}
                  alt="Featured cake"
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
              ) : (
                "Featured Cake"
              )}
            </div>
            {isAdmin ? (
              <AdminImageEditOverlay
                label="Update featured cake"
                uploadEndpoint="/api/admin/upload/featured"
                currentImageUrl={featuredImageUrl}
                onUploaded={onFeaturedImageUploaded}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
