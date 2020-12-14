import React from "react";
import { Link } from "react-router-dom";
import IdleTimerContainer from "../IdleTimerComponent/IdleTimerComponent";
import "./Questions.css";

const Questions = () => {
    document.title = "Quiz | Musical Masterminds";
    let textInput = React.createRef();
    let questions = JSON.parse(sessionStorage.getItem("Questions"));
    let type = JSON.parse(sessionStorage.getItem("Type"));
    let answers = JSON.parse(sessionStorage.getItem("Answers"));
    let specificAnswers = [];
    let answerHistory = [];
    let questionNum = 0;
    let questionAnswers = 0;
    let finalScore = 0;
    let choice = '';
    let correctAnswer = '';

    const calculateFinalScore = () => {
        document.getElementById("displayScore").innerHTML = `You scored ${finalScore}/${questionNum}!`
        document.getElementById("final").style.visibility = "visible"
        document.getElementById("history").style.visibility = "visible"
    }

    const shuffleAnswers = () => {
        console.log(questions);
        console.log(answers);
        if (questionAnswers < answers.length) {
            choice = '';
            specificAnswers = [];
            document.getElementById("question").innerHTML = questions[questionNum];
            questionNum += 1;
            correctAnswer = answers[questionAnswers]
            if (type[questionNum - 1] === "multiple") {
                document.getElementById("answer3").style.visibility = "visible"
                document.getElementById("answer4").style.visibility = "visible"
                questionAnswers += 4;
                for (let x = questionAnswers - 4; x < questionAnswers; x++) {
                    specificAnswers.push(answers[x]);
                }
                for (let i = specificAnswers.length - 1; i > 0; i--) { //fisher-yates shuffle
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = specificAnswers[i];
                    specificAnswers[i] = specificAnswers[j];
                    specificAnswers[j] = temp;
                }
                document.getElementById("answer1").innerHTML = specificAnswers[0];
                document.getElementById("answer2").innerHTML = specificAnswers[1];
                document.getElementById("answer3").innerHTML = specificAnswers[2];
                document.getElementById("answer4").innerHTML = specificAnswers[3];
            } else if (type[questionNum - 1] === "boolean") {
                questionAnswers += 2;
                for (let x = questionAnswers - 2; x < questionAnswers; x++) {
                    specificAnswers.push(answers[x]);
                }
                if (specificAnswers[0] === "False") {
                    specificAnswers.reverse();
                }
                document.getElementById("answer1").innerHTML = specificAnswers[0];
                document.getElementById("answer2").innerHTML = specificAnswers[1];
                document.getElementById("answer3").style.visibility = "hidden"
                document.getElementById("answer4").style.visibility = "hidden"
            }
        } else {
            calculateFinalScore();    
        }
    };

    const chooseAnswer = (event) => {
        choice = event.target.innerHTML;
        console.log(choice);
    }

    const submit = () => {
        if (choice === '') {
            alert("You must select an answer first!")
        } else {
            if (choice === correctAnswer) {
                console.log("CORRECT")
                finalScore += 1;
            } else {
                console.log("INCORRECT")
            }
            shuffleAnswers();
        }
    }

    return (
        <div className="questions-wrapper">
            <IdleTimerContainer />
            <button className="start" onClick={shuffleAnswers}>Start</button>
            <p id="question">{questions[questionNum - 1]}</p>
            <div>
                <button type="button" className="answer" id="answer1" ref={textInput} onClick={chooseAnswer}>1</button>
                <button type="button" className="answer" id="answer2" ref={textInput} onClick={chooseAnswer}>2</button>
            </div>
            <div>
                <button type="button" className="answer" id="answer3" ref={textInput} onClick={chooseAnswer}>3</button>
                <button type="button" className="answer" id="answer4" ref={textInput} onClick={chooseAnswer}>4</button>
            </div>
            <div>
                <button type="submit" id="lock-in" className="lock-in" onClick={submit}>Lock in!</button>
            </div>
            <div id="final" className="final">
                <p id="displayScore">You got {finalScore}/{questionNum} correct!</p>
                <div id="history">

                </div>
                <ul>
                    <li><Link to="/quiz">Try Again!</Link></li>
                    <li><Link to="/leaderboard">See the Leaderboard</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Questions;