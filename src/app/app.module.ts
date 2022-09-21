import { AppComponent } from './app.component';
import { AppErrorsComponent } from './components/app-errors/app-errors.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizContentComponent } from './components/quiz-content/quiz-content.component';
import { QuizEffects } from './state/quiz.state.effects';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizNavComponent } from './components/quiz-nav/quiz-nav.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';
import { QuizSidenavComponent } from './components/quiz-sidenav/quiz-sidenav.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { debug } from "./state/state.meta.reducers";
import { environment } from '../environments/environment';
import { quizStateReducer } from './state/quiz.state.reducers';

@NgModule({
  declarations: [
    AppComponent,
    QuizNavComponent,
    QuizContentComponent,
    QuizInfoComponent,
    QuizComponent,
    AppHeaderComponent,
    QuizSidenavComponent,
    AppErrorsComponent,
    QuizIntroComponent,
    QuizResultsComponent
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({'quiz': quizStateReducer}, {metaReducers: [debug]}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([QuizEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
