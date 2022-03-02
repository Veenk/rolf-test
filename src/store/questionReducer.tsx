const defaultState = {
    questions: []
}

export const questionReducer = (state: any = defaultState, action: any) => {
    switch (action.type) {
        case "ADD_QUESTION": {
            return {...state, questions: [...state.questions, action.payload]}
        }
        default:
            return state;
    }
}
export type RootState = ReturnType<typeof questionReducer>
