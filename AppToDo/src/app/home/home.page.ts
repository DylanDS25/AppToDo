import { Component } from '@angular/core';
import { ITask } from '../Interfaces/ITask';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  task: ITask = {
    id: 0,
    title: '',
    done: false
  };

  tasks: ITask[] = [];

  constructor(private _AlertController: AlertController) { }

  async open() {


    const alert = await this._AlertController.create({
      header: "Agregar Nueva Tarea",
      inputs: [{
        type: 'text',
        name: 'title',
        placeholder: 'Ingrese Su Tarea'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        // handler: () => (
        //   console.log('')
        // )
      }, {
        text: 'Agregar',
        handler: (data) => {
          this.tasks.push({
            id: this.tasks.length + 1,
            title: data.title,
            done: false
          })
        }
      }]
    });
    await alert.present();
  }

  toggleTaksDone(task: ITask){
    task.done = !task.done
  }

  deleteTask(task: ITask){
    console.log('Borrando')
  }
}


