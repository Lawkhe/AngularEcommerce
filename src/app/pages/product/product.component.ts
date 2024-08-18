import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../usable/toast.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  data;
  // settings: Object;
  select_category = [];

  settings = {
    // mode: 'external',
    noDataMessage: 'Sin Productos',
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
      price: {
        title: 'Precio',
        type: 'number',
        filter: {
          type: "number",
        }
      },
      amount: {
        title: 'Cantidad',
        type: 'number',
        filter: {
          type: "number",
        }
      },
      image: {
        title: 'Link Imagen',
        editable: true,
        type: 'string',
        filter: {
          type: "string",
        }
      },
      categoryId: {
        title: 'Producto',
        editable: true,
        valuePrepareFunction: (value) => {
          return this.select_category.filter(category => category.value == value).map(category => category.title)[0];
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Buscar por categoría...',
            list: [],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Selecciona la categoría',
            list: []
          },
        },
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
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastService: ToastService,
  ){

    this.categoryService.view().subscribe(
      response => {
        response.forEach(category => {
          this.select_category.push({value: category['id'], title: category['name']});
        });

        this.settings.columns.categoryId.editor.config.list = this.select_category;
        this.settings.columns.categoryId.filter.config.list = this.select_category;
        this.settings = Object.assign({}, this.settings);
      }
    );

    this.productService.view().subscribe(
      response => {
        this.data = response
      }
    );
  }

  onDeleteConfirm(event): void {
    this.productService.delete(event.data.id).subscribe(response => {
      this.toastService.showToast('success', 'Listo', 'Producto eliminado.');
      event.confirm.resolve();
      this.load = true;
    });
  };

  onCreateConfirm(event): void {
    if (this.load) {
      this.load = false;
      let data = {
        name: event.newData.name,
        price: event.newData.price,
        amount: event.newData.amount,
        image: event.newData.image,
        categoryId: Number(event.newData.categoryId),
        state: event.newData.state,
      }
      this.productService.create(data).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Producto creado correctamente.');
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
        price: event.newData.price,
        amount: event.newData.amount,
        image: event.newData.image,
        categoryId: Number(event.newData.categoryId),
        state: event.newData.state,
      }
      this.productService.update(data).subscribe(response => {
        this.toastService.showToast('success', 'Listo', 'Producto actualizado correctamente.');
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
