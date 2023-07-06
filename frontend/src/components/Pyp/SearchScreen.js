import EmptyList from "./EmptyList";
import CourseList from "./CourseList";
import { useCourseList, useFilteredCourseCode } from "./PypListContext";

export default function SearchScreen() {
    const { courses } = useCourseList();
    const { courseCode } = useFilteredCourseCode();

    // filter the courses based on the course code searched
    const filteredCourses = courses.filter(course => 
        course.courseCode.toLowerCase().includes(courseCode.toLowerCase()));
        
    return (
        <div>
            {filteredCourses.length > 0 
            ? <CourseList courses={filteredCourses} /> 
            : <EmptyList />}
        </div>
    );
}