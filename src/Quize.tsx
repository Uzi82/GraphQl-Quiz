import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getQuery } from './Apollo/quizes'
import { useState, useRef } from 'react'

interface questionTS {
    question: string,
    answer1: string,
    answer2: string,
    rightAnswer: string
}

export default function Quize(): JSX.Element {
    const { quize } = useParams()
    const query = getQuery(quize)
    const {loading, error, data} = useQuery(query)
    const [question, setQuestion] = useState(0)
    const [answer, setAnswer] = useState(0)
    const answers: React.MutableRefObject<number> = useRef(0)
    function chooseAsnwer(id: string):void {
        let btn: HTMLElement | null = document.getElementById(id)
        let another: HTMLElement | null;
        if(id === '1') {
            another = document.getElementById('2')
            setAnswer(1)
        }
        else {
            another = document.getElementById('1')
            setAnswer(2)
        }
        btn?.classList.add('bg-lime-500')
        another?.classList.remove('bg-lime-500')
    }
    function next(answer: number, el: questionTS): void {
        if(answer===0) return
        switch(answer) {
            case 1: {
                if(el.rightAnswer == el.answer1) answers.current += 1
                break
            }
            case 2: {
                if(el.rightAnswer == el.answer2) answers.current += 1
                break
            }
        }
        if(question!=questions.length){
            setQuestion(question+1)
        }
        setAnswer(0)
    }
    if(loading) {
        return(<div className="loading-spinner"></div>)
    }
    if(error) {
        return(<h1 className="text-6xl text-red-600">Error</h1>)
    }
    const questions: Array<questionTS> = data.Quize.questions
    const render: Array<JSX.Element> = questions.map(el => {
        return(
            <div className='flex flex-col justify-between glass w-3/5 h-3/5 rounded-3xl p-10' key={question}>
                <h1 className='text-white text-6xl'>{el.question}</h1>
                <div className='m-5 flex flex-col gap-5'>   
                    <button onClick={()=>chooseAsnwer('1')} className='text-white text-4xl bg-opacity-50 border-2 w-fit px-4 py-2 rounded-lg hover:bg-lime-500 duration-300 hover:bg-opacity-50' id='1'>
                        {el.answer1}
                    </button>
                    <button onClick={()=>chooseAsnwer('2')} className='text-white text-4xl bg-opacity-50 border-2 w-fit px-4 py-2 rounded-lg hover:bg-lime-500 duration-300 hover:bg-opacity-50' id='2'>
                        {el.answer2}
                    </button>
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <h1 className='text-white text-4xl'>{question+1}/{questions.length}</h1>
                    <button onClick={()=>next(answer, el)} className='text-4xl border-2 w-fit px-4 py-1 rounded-lg text-white hover:bg-white hover:text-black duration-300 ml-auto'>
                        Next &raquo;
                    </button>
                </div>
            </div>    
        )
    })
    render.push(
        <div className='flex flex-col glass w-3/5 h-3/5 rounded-3xl p-10' key={question}>
            <h1 className='text-white text-8xl'>Congratulations!</h1>
            <div className='mt-10'>
                <h1 className='text-white text-6xl'>Results:</h1>
                <p className='text-white text-8xl'>{answers.current/questions.length*100}%</p>
            </div>
            <Link className='mt-auto ml-auto text-4xl border-2 w-fit px-4 py-1 rounded-lg text-white hover:bg-white hover:text-black duration-300' to={'/'}>Back</Link>
        </div>   
    )
    return(
        <div className='w-screen h-screen screen flex flex-col align-center justify-center'>
            {render[question]}
        </div>
    )
}