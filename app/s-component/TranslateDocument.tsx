'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Languages } from 'lucide-react';
import { FormEvent, useState, useTransition } from 'react';
import * as Y from 'yjs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from 'sonner';
  
{/*----------------------------------------------------------------*/}
type Language = 
  | "الإنجليزية"
  | "الإسبانية"
  | "الفرنسية"
  | "الألمانية"
  | "الإيطالية"
  | "البرتغالية"
  | "الروسية"
  | "الصينية"
  | "اليابانية"
  | "الكورية"
  | "العربية"
  | "الهندية"
  | "البنغالية"
  | "الأردية"
  | "التركية"
  | "الفارسية"
  | "السواحيلية"
  | "الهولندية"
  | "اليونانية"
  | "العبرية"
  | "البولندية"
  | "الرومانية"
  | "التشيكية"
  | "السلوفاكية"
  | "الهنغارية"
  | "السويدية"
  | "النرويجية"
  | "الدانماركية"
  | "الفنلندية"
  | "الأيسلندية"
  | "الإستونية"
  | "اللاتفية"
  | "الليتوانية"
  | "الصربية"
  | "الكرواتية"
  | "البلغارية"
  | "السلوفينية"
  | "البوسنية"
  | "المقدونية"
  | "الألبانية"
  | "الجورجية"
  | "الأرمينية"
  | "الكازاخية"
  | "الأوزبكية"
  | "الأذربيجانية"
  | "التايلاندية"
  | "الفيتنامية"
  | "الفلبينية"
  | "الملايو"
  | "الإندونيسية"
  | "اللاوية"
  | "الخميرية"
  | "البورمية"
  | "التاميلية"
  | "التيلوغو"
  | "الماراثية"
  | "الغوجاراتية"
  | "البنجابية"
  | "المالايالامية"
  | "الكانادية"
  | "السنهالية"
  | "النيبالية"
  | "المنغولية"
  | "الباسكية"
  | "الكتالونية"
  | "الجاليكية"
  | "الويلزية"
  | "الأيرلندية"
  | "الغيلية الاسكتلندية"
  | "الكورسيكية"
  | "السردينية"
  | "البريتونية"
  | "اللوكسمبورغية"
  | "الفاروية"
  | "الملغاشية"
  | "الكريولية الهايتية"
  | "الخوسا"
  | "الزولو"
  | "الأمهرية"
  | "الصومالية"
  | "الإيغبو"
  | "اليوروبا"
  | "الهوسا"
  | "الأفريقانية"
  | "الماورية"
  | "الساموية"
  | "التونغية"
  | "الفيجية"
  | "الهاوائية";

const languages: Language[] = [
  "الإنجليزية",
  "الإسبانية",
  "الفرنسية",
  "الألمانية",
  "الإيطالية",
  "البرتغالية",
  "الروسية",
  "الصينية",
  "اليابانية",
  "الكورية",
  "العربية",
  "الهندية",
  "البنغالية",
  "الأردية",
  "التركية",
  "الفارسية",
  "السواحيلية",
  "الهولندية",
  "اليونانية",
  "العبرية",
  "البولندية",
  "الرومانية",
  "التشيكية",
  "السلوفاكية",
  "الهنغارية",
  "السويدية",
  "النرويجية",
  "الدانماركية",
  "الفنلندية",
  "الأيسلندية",
  "الإستونية",
  "اللاتفية",
  "الليتوانية",
  "الصربية",
  "الكرواتية",
  "البلغارية",
  "السلوفينية",
  "البوسنية",
  "المقدونية",
  "الألبانية",
  "الجورجية",
  "الأرمينية",
  "الكازاخية",
  "الأوزبكية",
  "الأذربيجانية",
  "التايلاندية",
  "الفيتنامية",
  "الفلبينية",
  "الملايو",
  "الإندونيسية",
  "اللاوية",
  "الخميرية",
  "البورمية",
  "التاميلية",
  "التيلوغو",
  "الماراثية",
  "الغوجاراتية",
  "البنجابية",
  "المالايالامية",
  "الكانادية",
  "السنهالية",
  "النيبالية",
  "المنغولية",
  "الباسكية",
  "الكتالونية",
  "الجاليكية",
  "الويلزية",
  "الأيرلندية",
  "الغيلية الاسكتلندية",
  "الكورسيكية",
  "السردينية",
  "البريتونية",
  "اللوكسمبورغية",
  "الفاروية",
  "الملغاشية",
  "الكريولية الهايتية",
  "الخوسا",
  "الزولو",
  "الأمهرية",
  "الصومالية",
  "الإيغبو",
  "اليوروبا",
  "الهوسا",
  "الأفريقانية",
  "الماورية",
  "الساموية",
  "التونغية",
  "الفيجية",
  "الهاوائية"
];


{/*----------------------------------------------------------------*/}
const TranslateDocument = ({ doc }: {doc:  Y.Doc}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>("");
    const [summary, setSummary] = useState("");
    const [question, setQuestion] = useState("");
    const [isPending, startTransition] = useTransition();
    const handleAskQuestion = async (e: FormEvent)=>{
        e.preventDefault();
        startTransition(async ()=>{
            const documentData = doc.get("document-store").toJSON();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        target_lang: language,
                    })
                }
            )
            if(res.ok){
                const id = toast.loading("جاري ترجمة المستند...")
                const { translated_text } = await res.json();
                setSummary(translated_text);
                toast.success("تم تلخيص و ترجمة المدونة")
            }

        });
    }
  return (  
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger className="h-full">
        <Button className="h-full">
        <Languages  />
        <p className="mr-2 font-alex font-normal">لخّص وترجم</p>
        </Button>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-start font-alex justify-center p-10">
        <DialogHeader>
            <DialogTitle className="text-right text-2xl font-bold">
              لخص هذه المدونة وترجمها لأي لغة تريد
            </DialogTitle>
            <DialogDescription className="text-right text-sm">
                يمكنك اختيار لغة الترجمة من هذه القائمة.
            </DialogDescription>
            <hr className='mt-5 w-full'/>
            {question && <p className='text-gray-500 text-right font-alex'>س: {question}</p>}
        </DialogHeader>
        { summary && (
            <div className="mt-5 bg-gray-400 p-5 rounded-md">
                <p className="font-normal text-right font-alex">الملخص:{summary}</p>
            </div>
        )}
        <form className="flex flex-row justify-between items-center w-full mt-10" onSubmit={handleAskQuestion}>
        {/*--------------------------Language Select---------------------------*/}
            <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
            >
                <SelectTrigger className="w-full rounded-l-none">
                    <SelectValue placeholder="اختر لغة الترجمة" />
                </SelectTrigger>
                <SelectContent className='direction-rtl'>
                   {languages.map((language)=>(
                    <SelectItem key={language} value={language} className='text-right font-alex'>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </SelectItem>
                   ))}
                </SelectContent>
             </Select>
    {/*--------------------------Language Select-*/}

        <Button type="submit" disabled={!language || isPending} className="rounded-r-none">
            {isPending ? "انتظر قليلا..." : "لخّص وترجم"}
        </Button>
        </form>
    </DialogContent>
</Dialog>
  )
}

export default TranslateDocument