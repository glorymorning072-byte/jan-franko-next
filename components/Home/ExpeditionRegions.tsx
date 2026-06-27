const regionsData: { id: number; title: string; description: string; countries: string[]; image: string }[] = [
  {
    id: 1,
    title: "Nordic Region",
    description: "Rugged archery disciplines echoing Scandinavian heritage and cold-weather wilderness resilience.",
    countries: ["Norway", "Sweden", "Finland", "Denmark"],
    image: "https://images.pexels.com/photos/12177906/pexels-photo-12177906.jpeg"
  },
  {
    id: 2,
    title: "Europe",
    description: "Traditional bowmanship rooted in the historic forests and alpine terrains of the continent.",
    countries: ["Slovakia", "Austria", "Germany", "Switzerland"],
    image: "https://images.pexels.com/photos/7512302/pexels-photo-7512302.jpeg"
  },
  {
    id: 3,
    title: "Central Asian Steppe Archery",
    description: "Nomadic horseback archery traditions.",
    countries: ["Mongolia", "Kyrgyzstan", "Kazakhstan"],
    image: "https://images.pexels.com/photos/30876954/pexels-photo-30876954.jpeg"
  },
  {
    id: 4,
    title: "Historical Turkic & Ottoman Archery",
    description: "Mastery of the powerful composite bow and the legendary flight archery of the Ottoman Empire.",
    countries: ["Turkey"],
    image: "https://images.pexels.com/photos/30736363/pexels-photo-30736363.jpeg"
  },
  {
    id: 5,
    title: "East Asian Archery",
    description: "Kyudo and classical Asian bow traditions.",
    countries: ["Korea", "Japan", "Bhutan"],
    image: "https://images.pexels.com/photos/7126201/pexels-photo-7126201.jpeg"
  },
  {
    id: 6,
    title: "Expedition Regions",
    description: "Remote wilderness training locations.",
    countries: ["Yukon", "Patagonia", "South Africa", "Australia"],
    image: "https://images.pexels.com/photos/9784441/pexels-photo-9784441.jpeg"
  }
];

const ExpeditionRegions = () => {
  return (
    <div className="w-full bg-black p-2 gap-2 flex flex-col">
      {regionsData.map((region) => (
        <div key={region.id} className={`flex items-center justify-between h-screen w-full ${region.id % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}  gap-2 text-[#f0e9d9]`}>

          {/* Text Section */}
          <div className={`w-full md:w-2/5 h-full text-center ${region.id % 2 !== 0 ? 'bg-[#0e3b2e] text-[#f0e9d9]' : 'bg-[#f0e9d9] text-[#0e3b2e]'} flex flex-col items-center justify-center p-12`}>
            <h2 className="text-4xl font-bold mb-6">{region.title}</h2>
            <p className="text-lg mb-6">{region.description}</p>
            <b className="text-sm tracking-widest uppercase">{region.countries.join(" • ")}</b>
          </div>

          {/* Image Section */}
          <div
            className="w-full md:w-3/5 h-full flex items-center justify-center bg-cover bg-center relative"
          >
            <img src={region.image} alt={region.title} className="w-full h-full object-cover z-0" />
            <div className={`absolute inset-0 ${region.id % 2 !== 0 ? 'bg-[#0e3b2e]/50' : 'bg-[#f0e9d9]/50'}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpeditionRegions;