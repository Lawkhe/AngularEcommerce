import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../usable/toast.service';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'ngx-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent {
  data;

  settings = {
    // mode: 'external',
    noDataMessage: 'Sin Descuentos',
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
      percentage: {
        title: 'Porcentaje',
        type: 'number',
        filter: {
          type: "number",
        }
      },
      initDate: {
        title: 'Fecha de Inicio',
        editable: true,
        type: 'date',
        filter: {
          type: "date",
        }
      },
      endDate: {
        title: 'Fecha de Finalización',
        editable: true,
        type: 'date',
        filter: {
          type: "date",
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
    private discountService:DiscountService,
    private toastService: ToastService,
  ){

    this.discountService.view().subscribe(
      response => {
        this.data = response
      }
    );
  }

  onDeleteConfirm(event): void {
    this.discountService.delete(event.data.id).subscribe(response => {
      this.toastService.showToast('success', 'Listo', 'Categoría eliminada.');
      event.confirm.resolve();
      this.load = true;
    });
  };

  onCreateConfirm(event): void {
    if (this.load) {
      this.load = false;
      event.newData['password'] = event.newData['name'];

      this.discountService.create(event.newData).subscribe(response => {
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
        percentage: event.newData.percentage,
        initDate: event.newData.initDate,
        endDate: event.newData.endDate,
        state: event.newData.state,
      }
      this.discountService.update(data).subscribe(response => {
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
