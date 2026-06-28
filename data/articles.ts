export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface Region {
  id: string;
  title: string;
  description: string;
}

export interface Tag {
  id: string;
  title: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  regionId?: string;
  categories?: string[];
  tags?: string[];
  date: string;
  readTime: string;
  image: string;
  author: string;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: "bowyer-craft",
    title: "Bowyer Craft",
    description: "The ancient art of harvesting, curing, and shaping traditional bow wood. Learn how bows are split from yew wood, steam-bent from horn and sinew, and bound with natural adhesives."
  },
  {
    id: "technique",
    title: "Technique & Discipline",
    description: "Refining the physical posture, draw styles, and mental focus of historical bowmanship. From horse-archery release timing to heavy draw warfare form."
  },
  {
    id: "history",
    title: "History & Lore",
    description: "Exploring the historical significance, cultural traditions, and tactical warfare roles of traditional archery across nomadic empires and medieval kingdoms."
  },
  {
    id: "archery-philosophy",
    title: "Philosophy & Zen",
    description: "The mental training, breathing cycles, and mindfulness practices that elevate traditional bowmanship from combat to spiritual discipline."
  },
  {
    id: "expedition-survival",
    title: "Expedition & Survival",
    description: "Essential survival woodcraft, tracking, and environmental resilience tips gathered from remote expedition fields."
  }
];

export const regions: Region[] = [
  {
    id: "nordic",
    title: "Nordic Region",
    description: "Traditional archery disciplines of Scandinavia, characterized by high-latitude survival flatbows and extreme cold-weather woodcraft."
  },
  {
    id: "europe",
    title: "Europe",
    description: "Medieval longbow warfare and high-altitude alpine bowmaking traditions rooted in the ancient forests and peak terrains of Europe."
  },
  {
    id: "steppe",
    title: "Central Asian Steppe",
    description: "The epic nomadic horseback archery heritage of the vast grasslands, utilizing composite reflex bows and thumb-ring draw styles."
  },
  {
    id: "ottoman",
    title: "Historical Turkic & Ottoman",
    description: "The peak of distance flight archery and composite bow technology engineered during the golden era of the Ottoman empire."
  },
  {
    id: "east-asia",
    title: "East Asian",
    description: "Ritualistic bowmanship and classical composite reflex designs, focusing on standing zen meditation and asymmetric warbows."
  }
];

export const tags: Tag[] = [
  { id: "flatbow", title: "Flatbow" },
  { id: "winter", title: "Winter Archery" },
  { id: "yew", title: "Yew Wood" },
  { id: "warbow", title: "Warbow" },
  { id: "thumb-draw", title: "Thumb Draw" },
  { id: "horse", title: "Mounted Archery" },
  { id: "composite", title: "Composite Bow" },
  { id: "flight", title: "Flight Archery" },
  { id: "zen", title: "Kyudo" },
  { id: "horn-bow", title: "Horn Bow" },
  { id: "philosophy", title: "Philosophy" },
  { id: "survival", title: "Survival" },
  { id: "arrow", title: "Arrow Craft" },
  { id: "meditation", title: "Meditation" }
];

export const articles: Article[] = [
  // 1. NORDIC REGION
  {
    slug: "scandinavian-flatbow-design-survival",
    title: "The Scandinavian Flatbow: Design and Survival",
    subtitle: "How the unique rectangular limb cross-section dominated ancient boreal forests.",
    excerpt: "Discover the design details of the Holmegaard-style flatbows and why their rectangular limbs outlasted traditional round-limbed bows in harsh climates.",
    regionId: "nordic",
    categories: ["bowyer-craft", "history"],
    tags: ["flatbow", "winter"],
    date: "June 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1654593321497-1dea66d89091?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Academy Bowyer",
    featured: false,
    content: `
      <p>In the archaeological records of Northern Europe, the flatbow reigns supreme. The oldest complete bows ever discovered—uncovered in the peat bogs of Holmegaard, Denmark—date back over 9,000 years. Unlike the narrow, D-shaped cross-sections of later English longbows, these ancient hunting tools featured wide, flat limbs that tapered dynamically toward the tips.</p>
      
      <h4>The Engineering of Flat Limbs</h4>
      <p>Traditional round-limbed bows concentrate stress along a narrow ridge on the back of the bow, increasing the likelihood of fiber breakage. By shaping the limb with a wide, flat back and belly, ancient Nordic bowyers distributed the tension and compression forces evenly across the entire surface of the wood. This allowed them to craft high-performance bows from common local timbers like elm, ash, and hazel, rather than relying exclusively on rare yew wood.</p>
      
      <blockquote>
        "The flatbow is a triumph of localized woodcraft. It proved that a bowyer's geometric understanding could elevate basic forest timbers into lethal hunting tools."
      </blockquote>
      
      <h4>Survival Adaptations</h4>
      <p>In cold, high-humidity boreal environments, wood fibers become brittle. The flatbow's wider profile provides lateral stability and minimizes 'string follow' (the permanent bending of the limbs toward the string). For the nomadic hunter, a flatbow meant a reliable weapon that could withstand temperature swings, moisture exposure, and rugged daily carry through the dense pine forests of Scandinavia.</p>
    `
  },
  {
    slug: "archery-frozen-forests-nordic-techniques",
    title: "Archery in the Frozen Forests: Nordic Winter Techniques",
    subtitle: "Mastering release anchors and bow maintenance in sub-zero wilderness.",
    excerpt: "Winter changes everything. Learn how extreme cold affects bowstrings, timber flexibility, and the archer's anchor points in snowy climates.",
    regionId: "nordic",
    categories: ["technique", "expedition-survival"],
    tags: ["winter", "survival"],
    date: "June 25, 2026",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/6620627/pexels-photo-6620627.jpeg",
    author: "Expedition Guide",
    featured: false,
    content: `
      <p>Cold-weather archery is a discipline of vigilance. When temperatures drop below freezing, the behavior of natural materials changes drastically. Wood fibers stiffen, natural animal glues contract, and bowstrings can become brittle. Navigating the snowy woodlands of Sweden or Finland requires a specific set of tactical adjustments.</p>
      
      <h4>Adjusting the Draw and Anchor</h4>
      <p>Heavy winter clothing alters an archer's natural draw length and anchor points. Bulky jackets can catch the bowstring upon release, disrupting the arrow's flight path. Nordic archers learn to wear tightly-bound sleeve wraps and adjust their anchor slightly forward—drawing to the corner of the mouth (the 'Turkish anchor') rather than behind the jaw—to ensure a clean release path.</p>
      
      <h4>Protecting the Bow</h4>
      <p>A cold bow must never be drawn immediately. Drawing a frozen wooden bow can cause instant fracture. Before shooting, the archer must warm the limbs by rubbing them briskly with a piece of dry leather, friction-heating the fibers. Furthermore, natural sinew or hide glue wraps must be kept dry; moisture in sub-zero weather freezes, expands, and splits backing materials apart.</p>
      
      <h4>String Maintenance</h4>
      <p>Natural fibers like linen or hemp are highly susceptible to moisture-induced rot and stiffness in the snow. Waxing the string with a mixture of beeswax and pine resin shields the fibers from moisture, maintaining elasticity and preventing string snap in freezing temperatures.</p>
    `
  },

  // 2. EUROPE
  {
    slug: "alpine-bowyer-crafting-yew-bows-austria",
    title: "The Alpine Bowyer: Crafting Yew Bows in Austria",
    subtitle: "Harvesting and splitting high-altitude mountain yew for premium bows.",
    excerpt: "Yew is the king of bow woods. Explore the alpine harvesting process, ring splitting, and longbow shaping in the Austrian Alps.",
    regionId: "europe",
    categories: ["bowyer-craft"],
    tags: ["yew", "warbow"],
    date: "May 18, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/11807514/pexels-photo-11807514.jpeg",
    author: "Jan Franko",
    featured: true,
    content: `
      <p>High in the Tyrolean Alps, where the wind blows cold and the growing season is short, the mountain yew grows incredibly slow. This slow growth produces tight, dense annual rings—the holy grail of wooden bow making. Splitting a Alpine yew stave is a deliberate process requiring deep patience and a trained eye.</p>
      
      <h4>Why Alpine Yew?</h4>
      <p>The secret of the yew bow lies in its natural laminate structure. The wood of a yew tree consists of two distinct layers: the outer sapwood and the inner heartwood. Sapwood is highly elastic under tension (stretching), making it the perfect back for the bow. Heartwood is dense and exceptionally strong under compression (crushing), forming a natural belly. By splitting the wood so that a thin layer of sapwood remains attached to the heartwood, the bowyer creates a composite structure from a single piece of timber.</p>
      
      <blockquote>
        "The mountain yew grows in adversity, and from that struggle comes its strength. A stave from a tree that battled alpine winds has tighter wood grains, translating to a faster cast and longer lifespan."
      </blockquote>
      
      <h4>The Splitting Process</h4>
      <p>Splitting begins with a raw log. Using wedges and wooden mallets, the bowyer splits the log down the center grain, following the natural twist of the wood. The staves are then sealed on the ends with wax and left to cure in a dry, ventilated shed for a minimum of three years. Only when the moisture content drops to a stable 10-12% can the shaping (tillering) begin.</p>
      
      <h4>The Art of Tillering</h4>
      <p>Tillering is the process of removing wood from the belly of the bow until the limbs bend in a perfect, uniform arc. The alpine bowyer works with rasps, drawknives, and scrapers, removing only paper-thin shavings at a time. A single stroke too deep can ruin the stave, making tillering the ultimate test of the bowyer's mastery.</p>
    `
  },
  {
    slug: "english-longbow-history-heavy-draw-form",
    title: "The English Longbow: History and Heavy Draw Form",
    subtitle: "Exploring the military longbow and the draw mechanics of heavy warbows.",
    excerpt: "Shooting a 120 lb warbow requires skeletal alignment, not just muscular strength. Master the heavy draw form of medieval bowmen.",
    regionId: "europe",
    categories: ["history", "technique"],
    tags: ["warbow"],
    date: "June 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    // 
    author: "Academy Historian",
    featured: false,
    content: `
      <p>The English longbow was the heavy artillery of the medieval era. During the Hundred Years' War, English archers wreaked havoc on French forces at Agincourt and Crecy. These massive weapons drew between 100 to 180 lbs, launching heavy armor-piercing 'bodkin' arrows over 250 yards. Pulling such weights is physically impossible using arm strength alone; it requires specialized skeletal draw mechanics.</p>
      
      <h4>Skeletal Alignment and Laying into the Bow</h4>
      <p>To draw a heavy warbow, the archer does not pull the string; rather, they push the bow arm out while drawing the shoulder blades together. This action, known as 'laying into the bow,' transfers the weight from the weak muscles of the arm to the large muscles of the back and the skeletal structure of the chest. The bow hand remains locked, the elbow straight, and the weight is supported by a solid bone line running from shoulder to shoulder.</p>
      
      <h4>The Anchor and Release</h4>
      <p>Unlike light target bows drawn to the chin, warbows are drawn to the ear or collarbone. This maximizes the draw length (often 32 inches), storing maximum potential energy in the heavy yew limbs. The release must be instant and clean; 'creeping' (letting the string slip forward before release) reduces power and can result in severe string strike against the arm.</p>
      
      <h4>The Physical Toll</h4>
      <p>Skeletons of medieval archers excavated from the Mary Rose shipwreck show pronounced bone density changes: the left arm bones (bow arm) and right shoulder joint structures are significantly thicker and deformed, testifying to a lifetime of training and the massive loads sustained during combat.</p>
    `
  },

  // 3. CENTRAL ASIAN STEPPE ARCHERY
  {
    slug: "steppe-release-mongolian-thumb-ring-mastery",
    title: "The Steppe Release: Mongolian Thumb Ring Mastery",
    subtitle: "Refining the thumb draw and release technique using traditional horn rings.",
    excerpt: "Unlock the secrets of the thumb draw. Learn how horn, jade, and leather rings protect the hand and enable clean nomadic releases.",
    regionId: "steppe",
    categories: ["technique"],
    tags: ["thumb-draw", "composite"],
    date: "June 20, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/30876954/pexels-photo-30876954.jpeg",
    author: "Expedition Master",
    featured: false,
    content: `
      <p>For centuries, the horse archers of the Eurasian Steppe dominated the battlefields using a drawing technique completely different from the European Mediterranean draw. Instead of using three fingers to pull the string, nomadic archers utilized a single finger: the thumb. To protect the thumb and ensure a clean release, they wore rings crafted from bone, horn, jade, or metal.</p>
      
      <h4>The Thumb Lock Mechanics</h4>
      <p>In a thumb draw, the string is hooked behind the first joint of the thumb. The index finger is then folded over the thumb nail, locking the thumb in place. This creates a secure, mechanical clamp. Because the fingers do not twist the string, the thumb draw allows for a very narrow string angle, which is essential when shooting compact, high-performance composite reflex bows from horseback.</p>
      
      <blockquote>
        "The thumb draw is a mechanical release built from bone and muscle. It locks the string securely during horse movement and releases it with minimal friction."
      </blockquote>
      
      <h4>Sparing the Arrow and Left-Side Loading</h4>
      <p>In a Mediterranean draw, the arrow rests on the left side of the bow (for a right-handed archer). In a thumb draw, the arrow is placed on the right side. The drawing motion pushes the arrow shaft against the bow window, preventing it from falling off during heavy horse movement. This placement also allows the archer to load arrows extremely quickly, sliding them over the right side of the bow without crossing their sightline.</p>
      
      <h4>Choosing a Ring</h4>
      <p>Thumb rings vary in shape across historical regions. The Mongolian ring is typically a thick cylindrical band with a protruding lip to catch the string, while Turkish and Ottoman rings feature a sloped, shield-like tongue (called a 'kulak') that extends back along the pad of the thumb. The ring must fit perfectly; too tight and it cuts off circulation, too loose and it slips off mid-draw, risking injury.</p>
    `
  },
  {
    slug: "horseback-archery-training-rider-mount",
    title: "Horseback Archery: Training the Rider and Mount",
    subtitle: "Synchronizing the shot with the gallop and maintaining balance without stirrups.",
    excerpt: "Horseback archery is about timing. Learn how riders sync their release with the horse's suspension phase for maximum accuracy.",
    regionId: "steppe",
    categories: ["technique", "history"],
    tags: ["horse", "thumb-draw"],
    date: "June 27, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/18047510/pexels-photo-18047510.jpeg",
    author: "Steppe Trainer",
    featured: false,
    content: `
      <p>Shooting an arrow at a target while galloping at 30 miles per hour requires the ultimate synchronization of human, horse, and bow. In the nomadic traditions of Mongolia, Kyrgyzstan, and Kazakhstan, horse archery was not a hobby; it was a way of life. The core of the discipline lies in the rider's seat and the timing of the release.</p>
      
      <h4>The Dynamic Seat</h4>
      <p>A horse archer does not sit heavily in the saddle. Instead, they stand slightly in the stirrups, keeping their knees and hips bent and flexible. This posture acts as a shock absorber, separating the movement of the horse's back from the archer's upper body. The torso remains stable and independent, allowing the archer to rotate their waist and aim in any direction—forward, sideways, or backward (the famous 'Parthian shot').</p>
      
      <h4>The Suspension Phase Release</h4>
      <p>A galloping horse has a phase of flight when all four hooves are off the ground—the suspension phase. During this micro-second of suspension, the horse's body travels in a smooth, level plane, free from the jarring impact of hooves hitting the earth. The archer must time their draw and release to coincide exactly with this suspension phase. Releasing at this instant ensures maximum stability and target accuracy.</p>
      
      <h4>Training the Mount</h4>
      <p>Not every horse can be a bow-horse. The mount must be desensitized to the sound of the bowstring's snap, the flapping of feathers, and the whistling of arrows flying past its ears. The horse is trained to run at a steady, consistent gallop along a straight track (the 'corridor') without relying on rein contact, as the archer must use both hands to handle the bow and load arrows.</p>
    `
  },

  // 4. HISTORICAL TURKIC & OTTOMAN ARCHERY
  {
    slug: "ottoman-composite-bow-horn-sinew-glue",
    title: "The Ottoman Composite Bow: Horn, Sinew, and Glue",
    subtitle: "The complex organic composition of historical composite reflex bows.",
    excerpt: "Otoman composite bows are masterpieces of composite engineering. Explore the maple wood core, buffalo horn belly, and sinew backing.",
    regionId: "ottoman",
    categories: ["bowyer-craft", "history"],
    tags: ["composite", "horn-bow"],
    date: "April 29, 2026",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/6669402/pexels-photo-6669402.jpeg",
    author: "Jan Franko",
    featured: false,
    content: `
      <p>The historical Ottoman bow is widely considered the pinnacle of traditional bowyer engineering. Extremely short, light, and compact, it stored an immense amount of energy and could launch specialized arrows over distances exceeding 800 yards. This incredible performance was made possible by combining three distinct materials: wood, horn, and sinew.</p>
      
      <h4>The Three-Layer Architecture</h4>
      <p>An Ottoman bow is a laminate structure built around a central wooden core, typically made of maple or ash. On the belly of the bow (the side facing the archer), the bowyer glues strips of water buffalo horn. Horn is exceptionally strong under compression, resisting the crushing forces of the draw. On the back of the bow (the side facing the target), layers of animal sinew are applied. Sinew, harvested from the legs of cattle or deer, is highly elastic and behaves like rubber bands under tension.</p>
      
      <blockquote>
        "The composite bow is an organic machine. It merges the compression strength of horn with the tensile elasticity of sinew, using wood simply as a skeletal frame."
      </blockquote>
      
      <h4>Organic Adhesives and Curing</h4>
      <p>The layers are bound together using fish glue (made from the swim bladders of sturgeon) or hide glue. These natural adhesives are applied hot and require months to cure. In fact, a premium composite bow is bound in a highly reflexed 'C-shape' and left to dry in a temperature-controlled room for a full year before it is ever strung. Tillering a composite bow requires heating the limbs with charcoal fires to make the horn and glue pliable, allowing the bowyer to balance the limbs manually.</p>
      
      <h4>The Extreme Reflex</h4>
      <p>When unstrung, an Ottoman bow bends completely backward in a circle, with the limbs crossing over each other. Stringing the bow requires bending it back against its natural curvature. This extreme reflex stores massive pre-tension energy, resulting in high arrow velocity and an exceptionally flat trajectory.</p>
    `
  },
  {
    slug: "flight-archery-range-secrets-okcular-tekkesi",
    title: "Flight Archery: The Range Secrets of the Okcular Tekkesi",
    subtitle: "Ottoman distance archery records and the use of the siper arrow-guide.",
    excerpt: "How did Ottoman archers shoot over 800 yards? Discover the siper arrow guide, the pishrev arrow, and the Okcular Tekkesi guilds.",
    regionId: "ottoman",
    categories: ["history", "technique"],
    tags: ["flight", "composite"],
    date: "June 2, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1627831927345-ea86fd92b789?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Academy Historian",
    featured: false,
    content: `
      <p>During the Ottoman Empire, archery was elevated to an elite state sport. The center of this discipline was the 'Okcular Tekkesi' (Archers' Guild) in Istanbul. Ottoman archers set distance records that seem impossible today—Sultan Selim III shot an arrow 972 yards in 1798. Achieving such ranges required specialized flight arrows, high-power composite bows, and a unique arrow-guide device called the 'siper.'</p>
      
      <h4>The Siper Arrow-Guide</h4>
      <p>Normally, an arrow cannot be drawn past the front handle of the bow, limiting its maximum length. Ottoman flight archers used the 'siper'—a horn or leather trough strapped to the bow hand. This trough allowed the archer to use short, ultra-light arrows (called 'pishrev') and draw them *inside* the bow frame, pull the arrowhead past the bow handle and resting it in the siper guide. This enabled the use of a shorter, lighter arrow that stored full draw energy, resulting in maximum launch speeds.</p>
      
      <h4>Aerodynamics of Flight Arrows</h4>
      <p>Flight arrows were masterpieces of micro-engineering. Crafted from light pine or cedar, they featured a barrel-shaped shaft (thicker in the middle, tapering towards both ends) to reduce drag and air turbulence. The fletchings were tiny, made of thin parchment or leather, and glued flat to minimize wind resistance. The tips were small ivory or bone points, keeping the arrow's front weight to an absolute minimum.</p>
      
      <h4>The Flight Release</h4>
      <p>Flight shooting requires a violent, explosive release. The archer draws to the absolute limit of their skeletal frame, using a specialized flight ring. Upon release, they snap their wrist forward (a technique called 'shast') to clear the feathers from the bow and siper, launching the arrow at angles close to 43 degrees for maximum distance carry.</p>
    `
  },

  // 5. EAST ASIAN ARCHERY
  {
    slug: "kyudo-mindful-path-japanese-bow",
    title: "Kyudo: The Mindful Path of the Japanese Bow",
    subtitle: "Standing zen, ritual breathing, and the spiritual focus of the asymmetric yumi.",
    excerpt: "Kyudo is more than shooting; it is active meditation. Explore the eight stages of the Japanese draw and the asymmetric yumi bow.",
    regionId: "east-asia",
    categories: ["history", "technique", "archery-philosophy"],
    tags: ["zen", "philosophy", "meditation"],
    date: "May 29, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/7126201/pexels-photo-7126201.jpeg",
    author: "Kyudo Instructor",
    featured: false,
    content: `
      <p>In Japan, the practice of archery is known as Kyudo—the Way of the Bow. Rooted in Zen Buddhism and Shinto rituals, Kyudo is considered a path of self-cultivation and active meditation. The focus is not on hitting the target, but on executing the ritual movements with absolute presence and clean posture. If the form is correct, the hit occurs naturally.</p>
      
      <h4>The Asymmetric Yumi Bow</h4>
      <p>The primary weapon of Kyudo is the yumi—a massive bow standing over two meters tall. Unlike symmetrical Western bows, the yumi's grip is located at the lower third of the bow, rather than the center. This asymmetric design allows the archer to stand and kneel comfortably, and reduces hand shock (vibration) upon release, as the upper limb's longer length absorbs the recoil energy. Traditionally, the yumi is built from laminated bamboo and wood strips glued with natural fish adhesives.</p>
      
      <blockquote>
        "In Kyudo, the arrow is not aimed at the target; it is aimed at the self. The release is a letting-go of the ego, allowing the string to slip naturally from the hand."
      </blockquote>
      
      <h4>The Hassetsu: Eight Stages of the Draw</h4>
      <p>Every shot in Kyudo follows a rigid, choreographed sequence called the 'Hassetsu' (Eight Stages):</p>
      <ul>
        <li><strong>Ashibumi</strong>: Placing the feet to establish a stable stance.</li>
        <li><strong>Dozukuri</strong>: Correcting the posture and centering the spine.</li>
        <li><strong>Yugamae</strong>: Preparing the bow hand and hooking the string.</li>
        <li><strong>Uchioroshi</strong>: Raising the bow overhead.</li>
        <li><strong>Hikiwake</strong>: Drawing the bow down and outward.</li>
        <li><strong>Kai</strong>: The full draw state, where the archer breathes deeply and waits for the release.</li>
        <li><strong>Hanare</strong>: The natural release, occurring without conscious intent.</li>
        <li><strong>Zanshin</strong>: Holding the posture after the shot, reflecting on the state of mind.</li>
      </ul>
      
      <h4>The Spiritual Release</h4>
      <p>Kyudo archers wear a specialized three-fingered leather glove (yugake) with a hard resin thumb. The release occurs when the archer slightly rotates their wrist, causing the string to slip out. The bow rotates in the hand upon release, a motion called 'yugaeri,' wrapping the string around the outer arm in a elegant spiral.</p>
    `
  },
  {
    slug: "gakgung-korean-traditional-composite-horn-bow",
    title: "Gakgung: Korea's Traditional Composite Horn Bow",
    subtitle: "The construction and extreme reflex of the compact Korean warbow.",
    excerpt: "Gakgung bows are short, highly reflexed, and pack massive power. Learn how water buffalo horn, bamboo, and cow sinew are laminated.",
    regionId: "east-asia",
    categories: ["bowyer-craft"],
    tags: ["composite", "horn-bow"],
    date: "June 10, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/15306764/pexels-photo-15306764.jpeg",
    author: "Jan Franko",
    featured: false,
    content: `
      <p>The Gakgung (Korean horn bow) is one of the most compact and highly reflexed composite bows in the world. Standing less than four feet tall, this small warbow was capable of launching arrows over 150 yards in combat. Its construction is a meticulous process using seven natural materials: water buffalo horn, cow sinew, bamboo, mulberry wood, oak, croaker fish bladder glue, and birch bark wrapping.</p>
      
      <h4>The Lamination Process</h4>
      <p>The core of the Gakgung is a laminate of split bamboo and mulberry wood, joined at the grip with oak. On the belly, long strips of water buffalo horn (imported from Southeast Asia) are glued to support the massive compression forces. On the back, shredded cow sinew is layered in hot glue, cured, and sanded. The entire bow is then wrapped in waterproof birch bark (called 'hwapi') to protect the organic glues from moisture.</p>
      
      <h4>The Curing and Heat Treatment</h4>
      <p>Gakgung bows are built inside out: when unstrung, the limbs curl forward in a deep loop resembling a circle. Stringing the bow requires placing it in a specialized heating cabinet (called a 'jeombang') to warm the glue and fibers, making them flexible. The bowyer then uses a wooden framing tool (called a 'jiadong') to bend the limbs back and hook the string. This high-tension setup gives the Gakgung its characteristic explosive speed and flat trajectory.</p>
      
      <h4>Technique of the Korean Release</h4>
      <p>Shooting the Gakgung requires a deep thumb draw to the shoulder, with the bow arm tilted slightly outward. This stance, known as 'jeong-ga-gwan,' aligns the bow's short limbs and prevents the short string from pinching the fingers at full draw. The release is accompanied by a subtle forward twist of the wrist, allowing the bow to pivot in the hand and absorb the recoil energy cleanly.</p>
    `
  }
];
