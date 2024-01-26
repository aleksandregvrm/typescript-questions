type SubmitQuestionType = {
    questionType:string,
    question: string,
    answers: { option: string, isCorrect: boolean }[]
};

type allQuestionsType = SubmitQuestionType[];

type QueryObjectType = {
    questionType?: string,
    question?: string,
}

export {SubmitQuestionType,allQuestionsType,QueryObjectType}
