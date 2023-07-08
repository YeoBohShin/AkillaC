import ReplyCard from "./ReplyCard";

export default function Replies({ replies, pypName }) {
    return (
        <div className="replies">
            {replies.map((reply, index) => (
                <div key={index}>
                    <ReplyCard reply={reply} pypName={pypName} />
                </div>
            ))}
        </div>
    )
}