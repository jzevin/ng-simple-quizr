import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { QuizQuestion } from '../models/quiz.models';
import { QuizStateTestFixture } from '../testing/quiz.state.fixtures';
import { of } from 'rxjs';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should have a getQuizQuestions method', () => {
    expect(apiService.getQuizQuestions).toBeTruthy();
  });

  it('should have a getQuizQuestions method', () => {
    const serviceSpy = spyOn(apiService, 'getQuizQuestions');
    apiService.getQuizQuestions();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedQuestion: QuizQuestion =
      QuizStateTestFixture.questions[1];

    httpClientSpy.get.and.returnValue(of(QuizStateTestFixture.questions));

    apiService.getQuizQuestions().subscribe({
      next: (questions) => {
        expect((questions as readonly QuizQuestion[])[1])
          .withContext('expected questions')
          .toEqual(expectedQuestion);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
