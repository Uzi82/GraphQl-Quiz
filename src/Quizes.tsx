import { useQuery } from "@apollo/client"
import { quizes } from "./Apollo/quizes"
import { Link } from "react-router-dom"

interface questions {
    question: string,
    answer1: string,
    answer2: string,
    rightAnswer: string
}

interface arr {
    id: number,
    name: string,
    difficulty: string,
    description: string,
    questions: Array<questions>
}

export default function Quizes(): JSX.Element {
    const {loading, error, data} = useQuery(quizes)
    if(error) {
        return(<h1 className="text-6xl text-red-600">Error</h1>)
    }
    if(loading) {
        return(<div className="loading-spinner"></div>)
    }
    let arr: Array<arr> = data.allQuizes
    let render: Array<JSX.Element> = arr.map(el=>{
        let difficulty: string = ""
        switch(el.difficulty) {
            case "Hard": {
                difficulty = "text-red-400"
                break
            }
            case "Normal": {
                difficulty = "text-yellow-300"
                break
            }
            case "Easy": {
                difficulty = "text-green-400"
                break
            }
        }
        difficulty += " bg-white py-px px-1 rounded-md"
        return(
            <Link to={`/${el.id}`} className="w-60 h-80 rounded-2xl glass p-5 flex flex-col gap-1" key={el.id}>
                <h1 className="text-white text-4xl p-1">{el.name}</h1>
                <p className="text-white text-xl">Difficulty: <span className={difficulty}>{el.difficulty}</span></p>
                <p className="text-white text-xl">{el.description}</p>
            </Link>
        )
    })
    return(
        <>
            <div className="w-2/3 h-fit flex flex-row flex-wrap justify-between">
                {render}
            </div>
        </>
    )
}   