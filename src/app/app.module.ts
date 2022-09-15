import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizContentComponent } from './components/quiz-content/quiz-content.component';
import { QuizEffects } from './state/quiz.state.effects';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizNavComponent } from './components/quiz-nav/quiz-nav.component';
import { QuizSidenavComponent } from './components/quiz-sidenav/quiz-sidenav.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
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
    QuizSidenavComponent
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({'quiz': quizStateReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([QuizEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
