import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../usable/toast.service';
import { BuyService } from '../../services/buy.service';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'ngx-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent {
  data;

  settings = {
    noDataMessage: 'Sin Datos',
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
      description: {
        title: 'Descripción',
        type: 'number',
        filter: {
          type: "number",
        }
      },
    },
  };

  load = true;

  constructor(
    private auditService:AuditService
  ){
    this.auditService.view().subscribe(
      response => {
        this.data = response
      }
    );
  }

}
