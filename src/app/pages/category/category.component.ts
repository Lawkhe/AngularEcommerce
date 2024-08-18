import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../usable/toast.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  data;
  // settings: Object;
  select_role = [];
  select_identification = [];

  settings = {
    // mode: 'external',
    noDataMessage: 'Sin Categorías',
    pager: {
      display: true,
      perPage: 10,
    },
    actions:{
      columnTitle: "Acciones",
      add: true,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit" itemprop="Editar"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash" itemprop="Eliminar"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
        filter: {
          type: "string",
        }
      },
      description: {
        title: 'Descripción',
        editable: true,
        type: 'email',
        filter: {
          type: "string",
        }
      },
      state: {
        title: 'Estado',
        valuePrepareFunction: function(cell, row) {
          if (cell == true || cell == 'true') {
            return 'Activo';
          } else {
            return 'Inactivo';
          }
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Selecciona el estado',
            list: [
              { value: true, title: 'Activo' },
              { value: false, title: 'Inactivo' },
            ],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Buscar por estado',
            list: [
              { value: true, title: 'Activo' },
              { value: false, title: 'Inactivo' },
            ],
          },
        }
      },
    },
  };

  load = true;

  constructor(
    private categoryService:CategoryService,
    private toastService: ToastService,
  ){

    this.categoryService.view().subscribe(
      response => {
        this.data = response
      }
    );
  }

  onDeleteConfirm(event): void {
    this.categoryService.delete(event.data.id).subscribe(response => {
      this.toastService.showToast('success', 'Listo', 'Categoría eliminada.');
      event.confirm.resolve();
      this.load = true;
    });
  };

  onCreateConfirm(event): void {
    if (this.load) {
      this.load = false;
      event.newData['password'] = event.newData['name'];

      this.categoryService.create(event.newData).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Categoría creada correctamente.');
        event.newData['id'] = response['id'];
        event.confirm.resolve(event.newData);
        this.load = true;
      })

      setTimeout(() => {
        this.load = true;
        }, 3000
      );

    } else {
      this.toastService.showToast('warning', 'Espera!', 'Se esta validando el registro.');
    }
  }

  onEditConfirm(event): void {
    if (this.load) {
      this.load = false;
      let data = {
        id: event.newData.id,
        name: event.newData.name,
        description: event.newData.description,
        state: event.newData.state,
      }
      this.categoryService.update(data).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Categoría actualizada correctamente.');
        event.confirm.resolve(event.newData);
        this.load = true;
      });

      setTimeout(() => {
        this.load = true;
        }, 3000
      );

    } else {
      this.toastService.showToast('warning', 'Espera!', 'Se esta actualizando el registro.');
    }
  }

}
