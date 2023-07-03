import { useState, useEffect, useCallback } from "react";
import QuestionCard from "./QuestionCard";

export default function Questions({ questions }) {

    return (
        <div className="questions">
            <h1>Questions</h1>
            <ul>
            {questions.map((question, index) => (
                <li key={index}>
                    <QuestionCard question={question} />
                </li>
                ))}
            </ul>
        </div>
    )
}