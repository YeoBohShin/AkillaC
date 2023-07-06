export default function Replies({ replies }) {
    return (
        <div className="replies">
            {replies.map((reply, index) => (
                <div className="reply-card" key={index}>
                    <h1>{reply.author}</h1>
                    <p>{reply.threadContent}</p>
                    <h3>{reply.timestamp}</h3>
                </div>
            ))}
        </div>
    )
}