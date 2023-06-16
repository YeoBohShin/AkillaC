import EmptyList from "./EmptyList";
import NavBar from "../NavBar";
import CourseList from "./CourseList";
import { useCourseList, useFilteredCourseCode } from "./PypListContext";

export default function SearchScreen() {
    const { courses } = useCourseList();
    const { courseCode } = useFilteredCourseCode();
    const filteredCourses = courses.filter(course => 
        course.courseCode.toLowerCase().includes(courseCode.toLowerCase()));
        
    return (
        <div>
            <NavBar />
            {filteredCourses.length > 0 
            ? <CourseList courses={filteredCourses} /> 
            : <EmptyList />}
        </div>
    );
}