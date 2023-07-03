export default function QuestionCard({ question }) {
    return (
        <div className="question-card">
            <h1>{question.author}</h1>
            <p>{question.threadContent}</p>
            <h3>{question.timestamp}</h3>
        </div>
    )
}