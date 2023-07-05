import { useCourseList } from "./PypListContext";
import { useEffect, useState } from "react";
import PypCard from "./PypCard";
import LoadingScreen from "../LoadingScreen";

export default function PypList({ courseCode }) {
    const { fetchPypNames } = useCourseList();
    const [pyps, setPyps] = useState([]);

    useEffect(() => {
        fetchPypNames(courseCode, setPyps);
    }, [courseCode, fetchPypNames]);

    return (
        <>
        {pyps.length === 0 
        ? <LoadingScreen />
        :
        <div className="list">
            <h1>{ courseCode }</h1>
            <table>
                <thead>
                    <tr>
                        <th>{pyps.length} Papers Found</th>
                    </tr>
                </thead>
                <tbody>
                    {pyps && pyps.map((pypName, i) =>  {
                        return (
                            <tr key={i}>
                            <PypCard pypName={pypName} />
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>}
        </>
    );
}