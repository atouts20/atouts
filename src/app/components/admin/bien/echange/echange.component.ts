import { Component, OnInit } from '@angular/core';
import { Echange } from '../../../../model/model.echange';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EchangeService } from '../../../../service/echange.service';
import { AuthenticationService } from '../../../../service/authentication.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppUser } from '../../../../model/model.AppUser';
import { TokenStorage } from '../../../../utils/token.storage';

@Component({
  selector: 'app-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.css']
})
export class EchangeComponent implements OnInit {

  index1 = 0;
  childrenVisible = false;

  motCle: string = '';

  /*  listOfData = [
     {
       title: 'Banane',
       description: 'Bon a mangé banae',
       image: 'assets/asRach/images/showcase-3.png',
       avatar: 'assets/asRach/images/showcase-4.png',
     },
     {
       title: 'bombom',
       description: 'Bon a mangé bombom',
       image: 'assets/asRach/images/showcase-5.png',
       avatar: 'assets/asRach/images/showcase-4.png',
     },
     {
       title: 'Pomme',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-6.png',
       avatar: 'assets/asRach/images/showcase-5.png',
     },
     {
       title: 'Mangue',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-5.png',
       avatar: 'assets/asRach/images/showcase-6.png',
     },
     {
       title: 'Ignanme',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-3.png',
       avatar: 'assets/asRach/images/showcase-4.png',
     },
     {
       title: 'Patate',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-4.png',
       avatar: 'assets/asRach/images/showcase-3.png',
     },
     {
       title: 'Patate',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-4.png',
       avatar: 'assets/asRach/images/showcase-3.png',
     },
     {
       title: 'Patate',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-4.png',
       avatar: 'assets/asRach/images/showcase-3.png',
     },
     {
       title: 'Choux',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-2.png',
       avatar: 'assets/asRach/images/showcase-1.png',
     },
     {
       title: 'Manioc',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-1.png',
       avatar: 'assets/asRach/images/showcase-2.png',
     },
     {
       title: 'Pastec',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-8.png',
       avatar: 'assets/asRach/images/showcase-7.png',
     },
     {
       title: 'Pomme',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-6.png',
       avatar: 'assets/asRach/images/showcase-5.png',
     },
     {
       title: 'Yoyo',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-7.png',
       avatar: 'assets/asRach/images/showcase-8.png',
     },
     {
       title: 'Pomme',
       description: 'Bon a mangé Pomme',
       image: 'assets/asRach/images/showcase-6.png',
       avatar: 'assets/asRach/images/showcase-5.png',
     },
 
   ]; */
  listOfData
  data: any[] = [];
  selectedIndex = 2;
  //echangesList = [...this.listOfData];
  echangesList: Array<Echange> = [];
  echangesDemandeList: Array<Echange> = [];
  echangesAccepterList: Array<Echange> = [];
  pages: number = 0;
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;

  pageSize: number = 8;
  pagesNo: number = 0;
  echange: Echange;
  fileToUpload: File = null;
  selectedFiles: FileList;

  visible = false;
  validateForm: FormGroup;
  imageUrl: String = 'assets/asRach/images/iws_c.png';

  //currentUser: AppUser;
  currentUser: AppUser = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public httpC: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private echanegService: EchangeService,
    private tokenStorage: TokenStorage,
  ) {
    this.currentUser = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.currentUser);
  }
  resetForm() { }
  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:

        {
          this.loadEchangeByID();

          break;
        }
      case 1:

        {
          this.loadEchangeAActiverByID();

          break;
        }
      case 2:

        {
          this.loadEchangeAAccepterByID();

          break;
        }

      default:
        {
          this.loadEchangeByID();

          break;
        }

    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ajout() {
    this.open();
  }

  submitForm(): void {
    const formData = new FormData();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.echange = {
      id: null,
      nom: this.validateForm.value.nom,
      description: this.validateForm.value.description,
      photo:null,
      proprietaires: this.currentUser,
      tel: this.validateForm.value.tel
    }
    console.log(this.echange);

    formData.append('echange', JSON.stringify(this.echange));
    console.log(formData);
    formData.append('file', this.fileToUpload);
    console.log(formData);
    this.echanegService.postEchange(formData)
      .subscribe(
        data => {
          console.log(data);
          this.validateForm.reset();
          this.ngOnInit();

          this.imageUrl = 'assets/asRach/images/iws_c.png';

        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }



  ngOnInit() {
    this.loadEchangeByID();
    //console.log(this.authService.loadId());
    console.log(this.echangesList);
    /* console.log(this.listOfData);
    this.loadData(1);
    console.log(this.listOfData); */

    this.validateForm = this.fb.group({
      proprietaires: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      tel: [null, [Validators.required]]
    });

  }

  // listes des demandes d'échanges (à accepter) par propriétaire
  private loadEchangeAAccepterByID() {
    this.echanegService.getEchangeAAccepter(this.currentUser.id, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {
        this.echangesDemandeList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;

        console.log(this.echangesDemandeList);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
  // listes des demandes d'échanges (à activer) par propriétaire
  private loadEchangeAActiverByID() {
    this.echanegService.getEchangeAActiver(this.currentUser.id, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {

        this.echangesAccepterList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  // listes des demandes d'échanges par propriétaire
  private loadEchangeByID() {
    this.echanegService.getEchangeUser(this.currentUser.id, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {
        this.echangesList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  handeFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.imageUrl + '---TOLODE---' + file.item(0).name + '--GéGé----' +
      Image.toString);

  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
    this.fileToUpload = <File>event.target.files[0];
    console.log(this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }


  gotoLoadDataEchange(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadEchangeByID();
  }

  gotoLoadDataAccepter(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadEchangeAActiverByID();
  }

  gotoLoadDataDemande(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadEchangeAAccepterByID();
  }

  chercherEchange() { }

}
