// console.log all actions
import { ActionReducer } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if(!state) return reducer(state, action);
    const {quizSessionId} = state.quiz;
    const localStorageLogString = localStorage.getItem(quizSessionId);
    let localStorageLog = [];
    if(localStorageLogString) {
      localStorageLog = JSON.parse(localStorageLogString);
    } else {
      localStorage.clear();
      console.log('%c------ ✅ BEGIN QUIZR LOG ✅ ------', "color:#eee; font-size:36px; font-weight: bold");
    }
    localStorageLog.push([action, state]);
    localStorage.setItem(quizSessionId, JSON.stringify(localStorageLog));
    //
    console.log(`%c${action.type}`, "color:#eee; font-size:18px; font-weight: bold");
    console.log('state', state);
    console.log('action', action);
    // 
    return reducer(state, action);
  };
}
