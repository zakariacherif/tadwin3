import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
   <div className="flex flex-row items-center justify-start mt-11 animate-pulse ">
    <ArrowRight  className=" w-10 h-10" />
    <h1 className="text-3xl font-bold font-alex m-10 ">ابدأ التدوين بإنشاء مدونة جديدة</h1>
    
   </div>
  );
}
