const regionsData: { id: number; title: string; description: string; countries: string[]; image: string }[] = [
  {
    id: 1,
    title: "Nordic Region",
    description: "Rugged archery disciplines echoing Scandinavian heritage and cold-weather wilderness resilience.",
    countries: ["Norway", "Sweden", "Finland", "Denmark"],
    image: "https://images.pexels.com/photos/12177906/pexels-photo-12177906.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 2,
    title: "Europe",
    description: "Traditional bowmanship rooted in the historic forests and alpine terrains of the continent.",
    countries: ["Slovakia", "Austria", "Germany", "Switzerland"],
    image: "https://images.pexels.com/photos/7512302/pexels-photo-7512302.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 3,
    title: "Central Asian Steppe Archery",
    description: "Nomadic horseback archery traditions.",
    countries: ["Mongolia", "Kyrgyzstan", "Kazakhstan"],
    image: "https://images.pexels.com/photos/30876954/pexels-photo-30876954.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 4,
    title: "Historical Turkic & Ottoman Archery",
    description: "Mastery of the powerful composite bow and the legendary flight archery of the Ottoman Empire.",
    countries: ["Turkey"],
    image: "https://images.pexels.com/photos/30736363/pexels-photo-30736363.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 5,
    title: "East Asian Archery",
    description: "Kyudo and classical Asian bow traditions.",
    countries: ["Korea", "Japan", "Bhutan"],
    image: "https://images.pexels.com/photos/7126201/pexels-photo-7126201.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 6,
    title: "Expedition Regions",
    description: "Remote wilderness training locations.",
    countries: ["Yukon", "Patagonia", "South Africa", "Australia"],
    image: "https://images.pexels.com/photos/9784441/pexels-photo-9784441.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

const ExpeditionRegions = () => {
  return (
    <div className="w-full flex flex-col">
      {regionsData.map((region) => (
        <div 
          key={region.id} 
          className={`flex flex-col ${region.id % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between h-screen w-full text-secondary`}
        >
          {/* Text Section */}
          <div className={`w-full h-1/2 md:w-2/5 md:h-full text-center ${region.id % 2 !== 0 ? 'bg-primary text-secondary' : 'bg-secondary text-primary'} flex flex-col items-center justify-center p-6 md:p-12`}>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 md:mb-6">{region.title}</h2>
            <p className="text-base md:text-lg mb-4 md:mb-6">{region.description}</p>
            <b className="text-xs md:text-sm tracking-widest uppercase">{region.countries.join(" • ")}</b>
          </div>

          {/* Image Section */}
          <div
            className="w-full h-1/2 md:w-3/5 md:h-full flex items-center justify-center bg-cover bg-center relative"
          >
            <img 
              src={region.image} 
              alt={region.title} 
              className="w-full h-full object-cover z-0" 
              loading={region.id === 1 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className={`absolute inset-0 ${region.id % 2 !== 0 ? 'bg-primary/50' : 'bg-secondary/50'}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpeditionRegions;