import React from 'react'

const FounderBlock = () => {
  return (
    <section className="relative w-full flex items-center justify-center bg-secondary text-primary py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-accent/15 min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Grid: Asymmetrical layout, different from Expedition Regions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

          {/* Left Text Column (7 cols on large screen) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-primary uppercase">
                Head Instructor
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-primary tracking-tight leading-tight">
              Jan Franko
            </h2>

            <p className="text-lg md:text-xl text-primary/80 font-light leading-relaxed max-w-2xl">
              Training and expeditions are led by Jan Franko, founder of the academy.
              The academy is led by an instructor with decades of experience in traditional archery. Practical teaching extends back to the year 2000. This dual focus on physical biomechanics and mental stillness ensures practitioners build instinct through rigorous, measurable structure
            </p>

            <div className="relative pl-16 pr-10 mt-8">
              <div className="text-accent text-[90px] leading-none font-serif absolute -top-8 left-0 select-none">
                “
              </div>

              <p className="italic text-xl text-primary/90 font-serif leading-relaxed">
                The arrow does not seek the target, it simply finds its way when the mind is no longer in the way. Discipline is not a restriction, but the architecture of freedom.
              </p>

              <div className="text-right relative mt-6 pr-6">
                <span className="text-primary font-serif text-2xl italic font-bold">
                  — Jan Franko
                </span>
                <div className="text-accent text-[90px] leading-none font-serif absolute -bottom-14 right-0 select-none">
                  ”
                </div>
              </div>
            </div>
          </div>

          {/* Right Emblem Column (5 cols on large screen) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img 
              src="https://janfranko.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-11.33.11-PM-12.png" 
              alt="Founder Emblem" 
              className="w-full h-auto rounded-2xl shadow-xl border border-accent/15" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderBlock
