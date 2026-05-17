import FAQTitle from "./FAQTitle";
import { faqDatas } from "@/app/lib/faq-data";
import FAQQuestion from "./FAQQuestion";

export default function FAQSection() {
  return (
    <div className="w-full flex flex-col bg-white items-center">
      <FAQTitle />

      <div className="w-4/5">
        {faqDatas.map((data, i) => (
          <FAQQuestion key={i} data={data} />
        ))}
      </div>
    </div>
  );
}
