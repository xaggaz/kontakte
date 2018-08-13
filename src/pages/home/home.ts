import { KontakteProvider } from './../../providers/kontakte/kontakte';
import { Component } from '@angular/core';

import { NavController, AlertController, reorderArray } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    public navCtrl: NavController, 
    private alertController: AlertController,
    private kontakteProvider: KontakteProvider){
      this.todos = this.kontakteProvider.getTodos();
    }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            //this.todos.push(todoText);
            this.kontakteProvider.addTodo(todoText);
          }
        }
      ]
    });
    addTodoAlert.present();

  }

}
