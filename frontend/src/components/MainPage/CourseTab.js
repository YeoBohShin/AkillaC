import { useCourseList } from "../Pyp/PypListContext"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";

export default function CourseTab() {
    const { courses } = useCourseList();
    const { profile, handleUser } = useUser();
    const [currCourses, setCurrCourses] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const handleCourseSelect = async (event, index) => {
        const newCourses = [...currCourses];
        newCourses[index] = event.target.value;
        await updateProfile(profile.uid, { currCourses: newCourses });
        handleUser();
    };

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleGetStarted = async (event) => {
        event.preventDefault();
        const arr = Array(5).fill("");
        await updateProfile(profile.uid, { currCourses: arr });
        handleUser();
    }

    useEffect(() => {
        if (profile.currCourses) {
            setCurrCourses(profile.currCourses);
        } else {
            setCurrCourses(null);
        }
    }, [profile]);

    return (
        <div className="coursetab">
            <h1 className="course-header">Current Courses</h1>
            {currCourses === null 
            ? <button onClick={handleGetStarted} className="course-get-started-button">Get Started</button> 
            : editMode
            ? 
            <ul className="course-list">
                {currCourses.map((course, i) => (
                    <div key={i}>
                        <select onChange={event => handleCourseSelect(event, i)} 
                            className="course-select">
                            <option value={course} hidden>{course}</option>
                            {courses.map((course, i) => (
                                <option key={i} value={course.courseCode}>{course.courseCode}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button onClick={handleEdit} className="course-edit-button">Done</button>
            </ul>
            : (
            <ul className="course-list">
                {currCourses.map((course, i) => (
                    <li key={i}>
                        {course === ""
                        ? <p>Add Course</p>
                        :
                        <Link to={`/search/${course}`} className="course-link">
                                <h2>{course}</h2>
                        </Link>
                        }
                    </li>
                ))}
                <button onClick={handleEdit} className="course-edit-button">Edit</button>
            </ul>
            )}
        </div>
    )
}