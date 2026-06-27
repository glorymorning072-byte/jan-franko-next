import ExpeditionRegions from "@/components/Home/ExpeditionRegions";
import Image from "next/image";
import Institute from "@/components/Home/Institute";
import FounderBlock from "@/components/Home/FounderBlock";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <div className="w-full flex flex-row text-center h-[calc(100vh-100px)] ">
        <div className="w-2/5 h-full" >
          <img src="/Jan.png" alt="Jan" className="w-full h-full object-contain object-center" />
        </div>
        <div className="w-3/5 h-full p-8 text-right flex items-end justify-center flex-col" >
          <h1 className="text-4xl font-bold text-[#0e3b2e] text-right p-2 flex items-center justify-center">
            Jan Franko
          </h1>
          <span className=" text-xl font-bold text-[#0e3b2e] " >Training, Expeditions, Cultural Heritage</span>
          <p className="text-lg text-[#0e3b2e] mt-4 text-right p-2 flex items-center justify-center">
            A traditional archery academy focused on structured training, cultural study, and expeditions exploring historic archery traditions.
            At The Global Academy for Traditional Archery, we offer a comprehensive approach to learning the art of traditional archery. Our programs are designed to provide students with the skills, knowledge, and experience needed to excel in this ancient practice.
          </p>
          <button className="bg-[#0e3b2e] text-[#f0e9d9] font-bold py-2 px-4 mt-8 rounded-full hover:bg-[#0a2a1f]">
            Explore Our Programs
          </button>
        </div>
      </div>
      <ExpeditionRegions/>
      <Institute />
      <FounderBlock />
    </main>
  );
}
