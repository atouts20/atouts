import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../../../service/produits.service';
import { Panier } from '../../../model/model.panier';
import { ProduitItems } from '../../../model/model.produitItems';
import { PanierService } from '../../../service/panier.service';
import { Router } from '@angular/router';
import { CommandeService } from '../../../service/commande.service';
import { NzModalService, NzMessageService } from '../../../../../node_modules/ng-zorro-antd';
import { TokenStorage } from './../../../utils/token.storage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../../../service/authentication.service';
import { AppUser } from './../../../model/model.AppUser';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  
  panier: Panier;
  editCache = {};

  searchValue = '';
  childrenVisible = false;

  isVisible = false;
  validateForm: FormGroup;
  user: AppUser;

  constructor(
    private produitService: ProduitsService,
    private fb: FormBuilder,
    private router: Router,
    public panierService: PanierService,
    private message: NzMessageService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    public commandeService: CommandeService,
    private modalService: NzModalService, ) { }

  ngOnInit() {
    /* console.log( this.produitService.getPanier().items.values() );
    let gg = this.produitService.getPanier().items.values();
    console.log(gg);
    console.log(this.produitService.getPanier()); */
    // this.produitService.panier.items.values
    //console.log(this.panierService.panier.items.values())


    this.panier = this.panierService.panier
    //this.panier=this.panierService.ChargerPanier();
    console.log(this.panier);
    this.updateEditCache();




    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(20),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      remember: [true]
    });

    this.tokenStorage.signOut();
    this.authService.setIsConnectedUser();
    this.authService.setCurrentUserConnected();
  }

  onRemoveProductFromCaddy(p: ProduitItems) {
    this.panierService.removeProduct(p.id);
  }

  onNewCommande() {
    if (this.tokenStorage.getToken() == null) {
      this.isVisible = true;
    } else {
      this.router.navigateByUrl("/client");
    }

  }

  onReturnMarket() {
    this.router.navigateByUrl("/market-all");
  }




  updateEditCache(): void {

    this.panier.items.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  search() { }
  reset() { }


  startEdit(key: number): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data);
  }

  cancelEdit(key: number): void {
    this.editCache[key].edit = false;
    console.log(this.editCache[key].data);
  }

  saveEdit(key: number): void {
    const index = this.panier.items.findIndex(item => item.id === key);

    if (this.editCache[key].data.quantite > 0 && this.editCache[key].data.quantite < 3) {


      //if ((this.panier.items[index].quantite + this.editCache[key].data.quantite) < 3) {

      console.log('11111111');
      console.log(this.panier.items[index]);
      console.log('11111111');

      console.log('22222222');
      console.log(this.editCache[key].data);
      console.log('22222222');
      //this.authService.putUtilisateur(this.editCache[key].data);
      Object.assign(this.panier.items[index], this.editCache[key].data);
      // this.listUtilisateurs[ index ] = this.editCache[ key ].data;
      localStorage.setItem('locale', JSON.stringify(this.panier));

      this.editCache[key].edit = false;

    }

    //}

  }


  onViderPanier() {

    this.modalService.info({
      nzTitle: 'Information',
      nzContent: '<p> Etes-vous sûrs de vider votre panier? </p>',
      nzOkText: 'oui',
      nzCancelText: 'non',
      nzOnCancel: () => console.log('non'),
      nzOnOk: () => this.viderPanier()
    });

  }


  viderPanier() {
    this.panierService.initPanier();
    this.commandeService.initCommande();
    this.router.navigateByUrl("/market-all");
  }


  startDelete(id: number) {
    this.panierService.removeProduct(id);
    //this.panierService.ChargerPanier();
    this.panier = this.panierService.panier
    this.panier.items = this.panier.items.filter(i => i.id !== id);
  }



  //////////////////////////////////////////////////////////////////

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  submitForm(): void {
    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      this.authService.login(formData.username, formData.password).subscribe(
        (data) => {
          console.log(data);
          if (data.success === false) {
            this.createMessage('error', 'Identifiants invalids !');
          } else {
            let jwt = data.headers.get('Authorization');
            console.log(jwt);
            console.log('je suis jwt ======>');
            this.tokenStorage.saveToken(jwt);
            this.storeCurrentUser();
            console.log(this.tokenStorage.getToken());
            //location.href = '/atouts/admin';
            //location.href = '/admin';
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.createMessage('error', 'Erreur système. Veuillez réessayer ultérieurement !');
        });
    } else {
      this.createMessage('warning', 'Formulaire invalids. Veuillez renseigner tous les champs !');
    }
  }

  storeCurrentUser() {
    const formData = this.validateForm.value;
    this.authService.retrieveCurrentUser(formData.username).subscribe(
      (data) => {

        console.log(data);

        console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
        if (this.tokenStorage.saveCurrentUser(JSON.stringify(data)) == true) {
          this.authService.setIsConnectedUser();
          this.authService.setCurrentUserConnected();
          this.user = JSON.parse(this.tokenStorage.getCurrentUser());


          //location.href = '/admin';

          this.isVisible = false;

          //this.router.navigate(['admin']);
        }
        //window.l();
      },
      (error: HttpErrorResponse) => {
        // console.log('An error is occured ' + error.message);
      }
    );

  }

  onRegister() {
    this.router.navigate(['/register']);
  }





}
