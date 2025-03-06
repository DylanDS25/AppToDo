import { Component, input } from '@angular/core';
import { ITask } from '../Interfaces/ITask';
import { AlertController, IonItemSliding } from '@ionic/angular';

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
      }, {
        text: 'Agregar',
        handler: (data) => {
          if (data.title != ""){
            this.tasks.push({
              id: this.tasks.length + 1,
              title: data.title,
              done: false
            })
          } else {
            alert.message = "El campo no puede estar vacio";
            return false;
          }
          return true;
        }
      }]
    });
    await alert.present();
  }

  toggleTaksDone(task: ITask, slidingItem: IonItemSliding){
    task.done = !task.done
    slidingItem.close();
  }

  deleteTask(task: ITask) {
    console.log(this.tasks.indexOf(task));
    //Eliminar Dato (Metodo 1)
    this.tasks.splice(this.tasks.indexOf(task), 1);
    //Eliminar Dato(Metodo 2)
    // this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  async updateTask(task: ITask) {
    const alert = await this._AlertController.create({
      header: "Editar Tarea",
      inputs: [{
        type: 'text',
        name: 'title',
        value: task.title,
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Actualizar',
        handler: (data) => {
          this.tasks [this.tasks.indexOf(task)].title = data.title;
        }
      }]
    });
    await alert.present();
  }
}


//51.47 decoracion
