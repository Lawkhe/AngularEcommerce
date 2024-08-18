import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../usable/toast.service';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  data;
  // settings: Object;
  select_role = [];
  select_identification = [];

  settings = {
    // mode: 'external',
    noDataMessage: 'Sin usuarios',
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
      addButtonContent: '<i class="nb-person"></i><i class="nb-plus"></i>',
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
      username: {
        title: 'Correo',
        editable: true,
        type: 'email',
        filter: {
          type: "string",
        }
      },
      role: {
        title: 'Rol',
        editor: {
          type: 'list',
          config: {
            selectText: 'Selecciona el rol',
            list: [
              { value: "USER", title: 'Usuario' },
              { value: "ADMIN", title: 'Administrador' },
            ],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Buscar por rol',
            list: [
              { value: "USER", title: 'Usuario' },
              { value: "ADMIN", title: 'Administrador' },
            ],
          },
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
    private router: Router,
    private userService:UserService,
    private toastService: ToastService,
    private dialogService:NbDialogService,
  ){

    this.userService.view().subscribe(
      response => {
        this.data = response
      }
    );
  }

  onDeleteConfirm(event): void {
    this.userService.delete(event.data.id).subscribe(response => {
      this.toastService.showToast('success', 'Listo', 'Usuario eliminado.');
      event.confirm.resolve();
      this.load = true;
    });
  };

  onCreateConfirm(event): void {
    if (this.load) {
      this.load = false;
      event.newData['password'] = event.newData['name'];

      this.userService.create(event.newData).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Usuario creado correctamente.');
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
        username: event.newData.username,
        password: event.newData.password,
        role: event.newData.role,
        state: event.newData.state,
      }
      this.userService.update(data).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Usuario actualizado correctamente.');
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
