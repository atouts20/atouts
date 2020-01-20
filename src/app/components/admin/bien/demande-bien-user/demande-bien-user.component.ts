import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Bien } from './../../../../model/model.bien';
import { AppUser } from './../../../../model/model.AppUser';
import { TokenStorage } from './../../../../utils/token.storage';
import { AcceptationBiensService } from './../../../../service/acceptationBiens.service';
import { Publication } from './../../../../model/model.publication';
import { PublicationService } from './../../../../service/publication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-demande-bien-user',
  templateUrl: './demande-bien-user.component.html',
  styleUrls: ['./demande-bien-user.component.css']
})
export class DemandeBienUserComponent implements OnInit {
  selectedIndex = 0;
  //data: any[] = [];
  toto;
  fileToUpload: File = null;
  publication;
  selectedFiles: FileList;

  pageSize: number = 8;
  pagesNo: number = 0;
  motCle: string = '';
  //publicationList: Array<Publication> = [];
  publicationDemandeList: Array<Publication> = [];
  publicationAccepterList: Array<Publication> = [];
  publicationRejeterList: Array<Publication> = [];

  formData = new FormData();

  inputValue = '';

  childrenVisible = false;

  propret: AppUser = null;


  //listOfDisplayData = [...this.listOfData];
  listOfDisplayData = [];
  //countries:listOfData[];
  pages: number = 0;
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;

  visible = false;
  validateForm: FormGroup;
  imageUrl: String = 'assets/asRach/images/iws_c.png';

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private tokenStorage: TokenStorage
  ) {
    this.propret = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      prix: [null, [Validators.required]],
      cat: ['PROD', [Validators.required]],
      tBCCV: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      stockAlert: [null, [Validators.required]],
    });
    this.getDemandePub();
    this.getDemandePubAccepter();
    this.getDemandePubRejet();
  }


  rechercherDemandeRejet(){}

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ajout() {
    this.fileToUpload = null;
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.inputValue == "PROD"
    this.ngOnInit();
    this.open();
  }

  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:
        {
          this.getMesServices();
          break;
        }
      case 1:
        {
          this.getMesProduits();
          break;
        }
      case 2:
        {
          this.getDemandePubAccepter();
          break;
        }
      case 3:
        {
          this.getDemandePubRejet();
          break;
        }
      case 4:

        {
          this.getDemandePub();
          break;
        }

      default:
        {
          this.getDemandePub();

          break;
        }

    }
  }


  /* ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required]],
      cat: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      prix: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      tel: [null, [Validators.required]]
    });

    this.loadPublications();

  } */

  submitForm(): void {

    let k = 0;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      k++;
    }
    console.log(k);


    let publication = {
      nom: this.validateForm.value.nom,
      description: this.validateForm.value.description,
      prix: this.validateForm.value.prix,
      proprietaire: this.propret,
      cat: this.validateForm.value.cat,
      tel: this.propret.phoneNumber,
     
    };

    this.formData.append('publication', JSON.stringify(publication));
    this.formData.append('file', this.fileToUpload);

    console.log(publication);

    this.publicationService.postDemandePublication(this.formData)
      .subscribe(
        res => {
          console.log(res);
          this.resetDemande();

        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });


  }

  resetDemande() {
    this.ngOnInit();
    this.formData = new FormData();
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.inputValue == "";
    this.fileToUpload = null;
    //this.onSelectFile(null);
  }





  isPub() {
    if (this.inputValue == "PRODUIT") return true;
  }





  onSelectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
    this.fileToUpload = <File>event.target.files[0];
    //this.pastof=false;
    console.log(this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  getDemandePub() {
    this.publicationService.getDemandePublication(this.propret.id, this.pagesNo, this.pageSize, this.motCle)
      .subscribe((data: any) => {
        this.publicationDemandeList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  getDemandePubAccepter() {
    this.publicationService.getDemandePublicationAc(this.propret.id, this.pagesNo, this.pageSize, this.motCle)
      .subscribe((data: any) => {
        this.publicationAccepterList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  getDemandePubRejet() {
    this.publicationService.getDemandePublicationNAc(this.propret.id, this.pagesNo, this.pageSize, this.motCle)
      .subscribe((data: any) => {
        this.publicationRejeterList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  gotoLoadDataDemandePublication(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.getDemandePub();
  }

  gotoLoadDataAccepterPublication(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.getDemandePubAccepter();
  }

  gotoLoadDataDemandeRejet(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.getDemandePubRejet();
  }

  rechercherDemande() {
    this.getDemandePub();
  }
  rechercherDemandeRejeter() {
    this.getDemandePubRejet();
  }
  rechercherDemandeAccepter() {
    this.getDemandePubAccepter();
  }
  rechercher() { }
  getMesServices() { }
  getMesProduits() { }

  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  /* Fin méthode format monnetaire */
}
