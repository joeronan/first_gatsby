import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import emojiList from '../data/emoji-list.json';
import "../components/custom.css"


const ReadingTheEmojiInTheEyesTestPage = ({ data }) => {

  const [status, setStatus] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [question, setQuestion] = React.useState(1)
  const [correctIndex, setCorrectIndex] = React.useState(Math.floor(Math.random() * emojiList.length))
  const [usedIndexes, setUsedIndex] = React.useState([correctIndex])
  const [lastCorrect, setLastCorrect] = React.useState(false)

  const getIncorrectIndices = () => {
    const randomList = []
    while (randomList.length < 3) {
      const random = Math.floor(Math.random() * emojiList.length)
      if (randomList.indexOf(random) === -1 && correctIndex !== random) {
        randomList.push(random)
      }
    }
    return randomList
  }

  const [incorrectIndices, setIncorrectIndices] = React.useState(getIncorrectIndices())

  const answer = () => {
    setQuestion(question + 1)
    newCorrectIndex()
    setIncorrectIndices(getIncorrectIndices())
    if (question === 36) {
      setStatus(2)
    }
  }
  const correctAnswer = () => {
    setScore(score + 1)
    setLastCorrect(true)
    answer()
  }
  const incorrectAnswer = () => {
    setLastCorrect(false)
    answer()
  }
  const newCorrectIndex = () => {
    while (true) {
      const random = Math.floor(Math.random() * emojiList.length)
      if (usedIndexes.indexOf(random) === -1) {
        setCorrectIndex(random)
        setUsedIndex(usedIndexes + [random])
        break
      }
    }
  }
  const renderResult = () => {
    if (score < 10) return "You really should have gotten more than just the cats. 👎👎👎"
    if (score < 20) return "You understand the basics of emoji emotion. Some day, with enough training, you could learn to love them. 👍👍👍"
    if (score < 30) return "You relate a lot to these emoji. You understand their joys and their losses. But still, they conceal a rich inner life that you can't quite reach. 🙌🙌🙌"
    return "You are a true emoji empath. Congratulations. 👏👏👏"
  }

  var optionButtons = [
    <><button className="red-button" onClick={incorrectAnswer}>{emojiList[incorrectIndices[0]]["Description"]}</button><br /></>,
    <><button className="red-button" onClick={incorrectAnswer}>{emojiList[incorrectIndices[1]]["Description"]}</button><br /></>,
    <><button className="red-button" onClick={incorrectAnswer}>{emojiList[incorrectIndices[2]]["Description"]}</button><br /></>,
  ]
  optionButtons.splice(Math.floor(Math.random() * optionButtons.length), 0, <><button className="red-button" onClick={correctAnswer}>{emojiList[correctIndex]["Description"]}</button><br /></>)

  return <Layout>
    <SEO title="Reading the Emoji in the Eyes Test" />
    <h1>Reading the Emoji in the Eyes</h1>

    <p>Are you an emoji empath? A smiley sympathiser? An icon intuiter? Take this adaptation of the "Reading the Mind in the Eyes Test" to find out!</p>

    <p>The goal is simple: select whichever option best describes the emotions of the emoji shown.</p>

    <div style={{ textAlign: "center", padding: "0px 10px 20px 10px", marginBottom: "200px", border: "1px solid #00000055", backgroundColor: "#00000005", borderRadius: "20px" }}>
      {
        status === 0 && <button style={{ marginTop: "20px" }} className="red-button" onClick={() => (setStatus(1))}>Begin</button>
      }

      {
        status === 1 &&
        <><h2>Question: {question}/36</h2>

          <span><b>Last Answer:</b> {question === 1 ? " - " : lastCorrect ? <span style={{ color: "green" }}>Correct</span> : <span style={{ color: "red" }}>Incorrect</span>}</span><br />
          <span><b>Running Score:</b> {score}/{question - 1}</span>

          <div style={{ position: "relative" }}>
            <div style={{ background: "#000000", left: "50%", width: "100px", height: "35px", position: "absolute", transform: "translate(-50px,15px)" }}></div>
            <div style={{ background: "#000000", left: "50%", width: "100px", height: "35px", position: "absolute", transform: "translate(-50px,80px)" }}></div>
            <span style={{ fontSize: "100px" }}> {emojiList[correctIndex]["Emoji"]}</span>
          </div>
          {optionButtons}

        </>
      }

      {
        status === 2 && <>
          <h3>Complete! Your final score was {score}/36</h3>
          <p>{renderResult()}</p>
        </>
      }
    </div>
  </Layout >
}

export default ReadingTheEmojiInTheEyesTestPage
