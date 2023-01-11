export const ActionTypes = {
    ADD_FILE: "ADD_FILE",
}

export function addFile(name, language, value) {
    let payload = {
        name,
        language,
        value
    }
    return (dispatch) => {
        dispatch({ type: ActionTypes.ADD_FILE, payload: payload });
    }

}
   