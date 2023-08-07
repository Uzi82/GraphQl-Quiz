import { gql } from "@apollo/client";

export const quizes = gql`
    query quizes {
        allQuizes {
            id
            difficulty
            name
            description
            questions
        }
    }
`

export function getQuery(id) {
    return gql`query GET_QUIZE{
        Quize(id: ${id}) {
        id
        difficulty
        name
        description
        questions
      }
    }`
}