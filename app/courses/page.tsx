import Course from "../ui/components/Courses/Course";
import { courseDatas } from "../lib/courses-data";

export default function Courses() {
  return (
    <div className="flex flex-col gap-10 items-center my-12">
      {courseDatas.map((data, i) => <Course key={i} data={data} />)}
    </div>
  );
}
