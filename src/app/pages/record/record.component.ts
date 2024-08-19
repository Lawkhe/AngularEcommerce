import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../usable/toast.service';
import { BuyService } from '../../services/buy.service';

@Component({
  selector: 'ngx-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent {
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
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      createDate: {
        title: 'Fecha de Compra',
        type: 'string',
        filter: {
          type: "string",
        }
      },
      products: {
        title: 'Productos',
        editable: true,
        valuePrepareFunction: (value) => {
          let text = '';
          value.forEach(element => {
            text += element.name + ', '
          });
          return text;
        },
        filter: {
          type: "string",
        }
      },
      amount: {
        title: 'Cantidad de Productos',
        editable: true,
        type: 'string',
        filter: {
          type: "string",
        }
      },
      total: {
        title: 'Total',
        type: 'number',
        filter: {
          type: "number",
        }
      },
    },
  };

  load = true;

  constructor(
    private buyService:BuyService,
    private toastService: ToastService,
  ){
    let user = JSON.parse(localStorage.getItem('session')) || null;
    this.buyService.user_view(user.id).subscribe(
      response => {
        this.data = response
      }
    );
  }

}
