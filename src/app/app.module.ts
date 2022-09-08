import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { QuizContentComponent } from './components/quiz-content/quiz-content.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizNavComponent } from './components/quiz-nav/quiz-nav.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { QuizComponent } from './components/quiz/quiz.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizNavComponent,
    QuizContentComponent,
    QuizInfoComponent,
    QuizComponent,
    AppHeaderComponent,
    QuizOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
