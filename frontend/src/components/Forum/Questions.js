import QuestionCard from "./QuestionCard";

export default function Questions({ questions, pypName }) {
    return (
        <div className="questions">
            <h1>Questions</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <QuestionCard question={question} pypName={pypName} />
                    </li>
                ))}
            </ul>
        </div>
    )
}