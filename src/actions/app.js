import store from "../store"
export function quit(){
    store.dispatch({
        type:"QUIT"
    })
}