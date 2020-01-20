import { Component, OnInit } from '@angular/core';
import { Operation } from './../../../../model/model.operation';
import { OperationBanqueService } from './../../../../service/operationBanque.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from './../../../../utils/token.storage';
import { AppUser } from './../../../../model/model.AppUser';

@Component({
  selector: 'app-autorisation-operation',
  templateUrl: './autorisation-operation.component.html',
  styleUrls: ['./autorisation-operation.component.css']
})
export class AutorisationOperationComponent implements OnInit {
  listOperation: Array<Operation> = [];
  user: AppUser = null;

  constructor(
    private operationBanqueService: OperationBanqueService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private tokenStorage: TokenStorage, ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {
    this.listOperationEn();
  }
  listOperationEn() {
    this.operationBanqueService.getAllOperationEn().subscribe(
      (data: Array<Operation>) => {
        this.listOperation = data;
        console.log(this.listOperation);
      });
  }
  rejecter(data) {
    const operation = new Operation(
      data.id,
      data.compte.numCompte,
      data.numCompteSysteme,
      data.montantOp,
      data.narrative,
      data.badge,
      data.type,
      data.createBy,
      null,
      data.autorisedBy = this.user.username
    );
    this.operationBanqueService.rejeterOperation(operation).subscribe(
      (res: Operation) => {
        this.listOperation = this.listOperation.filter(d => d.id !== res.id);
        console.log(res);
      }, (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
  }
  accepter(data) {
    const operation = new Operation(
      data.id,
      data.compte.numCompte,
      data.numCompteSysteme,
      data.montantOp,
      data.narrative,
      data.badge,
      data.type,
      data.createBy,
      null,
      data.autorisedBy = this.user.username
    );
    this.operationBanqueService.accepterOperation(operation).subscribe(
      (res: Operation) => {
        this.listOperation = this.listOperation.filter(d => d.id !== res.id);
        console.log(res);
      }, (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
  }
  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  // Fin méthode format monnetaire
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
