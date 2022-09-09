import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ApiService } from '../services/api.service';
import { Injectable } from "@angular/core";
import { QuizQuestion } from '../models/quiz.models';
import { quizActions } from './quiz.state.actions';

@Injectable()
export class QuizEffects {

  constructor(private api: ApiService, private actions$: Actions,) {}

  loadSlidesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(quizActions.loadQuestions),
      mergeMap(() => {
        return this.api.getQuizQuestions().pipe(
          map((questions) => quizActions.loadQuestionsSuccess({ payload: questions as ReadonlyArray<QuizQuestion> })),
          catchError((error) => of(quizActions.loadQuestionsFailure({payload: error})))
        );
      })
    )
  })
}