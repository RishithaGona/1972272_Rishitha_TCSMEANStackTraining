import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [{
  path:"\home",component:HomeComponent},
{path:"\quiz",component:QuizComponent},
{path:"\answers",component:AnswersComponent},
{path:"",redirectTo:"\home",pathMatch:"full"},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
