import React from "react"
import { connect } from "react-redux"

interface Author {
  name: string
  books: string[]
}

interface TurnData {
  author: Author
  books: string[]
}

function Hero() {
  return (
    <div className="flex flex-col items-center p-4 m-2 rounded-md bg-slate-100 w-[50%]">
      <div>
        <h1 className="text-gray-900 font-bold text-2xl font-serif">
          Author Quiz
        </h1>
      </div>
      <div>
        <p>Select the book written by author</p>
      </div>
    </div>
  )
}

function Turn({
  author,
  books,
}: {
  author: Author
  books: string[]
  change: (color: string) => void
}) {
  const [btnColor, setBtnColor] = React.useState("")
  const [hoverColor, setHoverColor] = React.useState("hover:bg-gray-300")
  const [clickedButtons, setClickedButtons] = React.useState("")

  // Function to handle button click
  const handleButtonClick = (title: string, books: string[]) => {
    // Check if the button is already clicked
    setBtnColor(books.includes(title) ? "bg-green-600 text-white" : "bg-red-600 text-white");
    setHoverColor(books.includes(title) ? "hover:bg-green-700" : "hover:bg-red-700");
    setClickedButtons(title)
  }

  return (
    <div className="flex flex-col items-center m-4 gap-2">
      <div>
        <p>{author.name}</p>
      </div>
      <div>
        {books.map((title) => (
          <p
            className={`${
              clickedButtons.includes(title) ? btnColor : "bg-white-200"
            } ${clickedButtons.includes(title) ? hoverColor: "hover:bg-gray-200"} border-2 border-blue-400 mt-2 p-4 w-80 rounded-md hover:cursor-pointer `}
            key={title}
            onClick={() => {
              handleButtonClick(title, author.books)
            }}
          >
            {title}
          </p>
        ))}
      </div>
    </div>
  )
}

function Continue() {
  return <></>
}

const mapStateToProps = (state: { turnData: TurnData }) => {
  return {
    turnData: state.turnData,
  }
}

const mapDispatchToProps = () => {
  return {
    onAnswerSelected: () => {},
  }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)
function App({ turnData }: { turnData: TurnData }) {
  const [bgColor, setBgColor] = React.useState("bg-white-500")

  return (
    <div className={`${bgColor} flex flex-col items-center`}>
      <Hero />
      <Turn
        {...turnData}
        change={(color: string) => {
          setBgColor(color)
        }}
      />
      <Continue />
    </div>
  )
}

export default App
