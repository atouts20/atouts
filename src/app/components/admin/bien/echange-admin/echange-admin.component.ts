import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Echange } from './../../../../model/model.echange';
import { AcceptationService } from './../../../../service/acceptation.service';
import { TokenStorage } from './../../../../utils/token.storage';
import { AppUser } from './../../../../model/model.AppUser';
import { EchangeService } from './../../../../service/echange.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-echange-admin',
  templateUrl: './echange-admin.component.html',
  styleUrls: ['./echange-admin.component.css']
})
export class EchangeAdminComponent implements OnInit {

  selectedIndex = 0;
  selectedFiles: FileList;
  imageUrl: String = 'assets/asRach/images/iws_c.png';
  fileToUpload: File = null;
  tabs: any[] = [];
  visible: boolean = false;
  estVisible: boolean = false;
  searchValue: string = '';
  editCache1 = {};
  editCache2 = {};
  editCache3 = {};
  dataSet1 = [];
  dataSet2 = [];
  dataSet3 = [];
  sortName = null;
  sortValue = null;
  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };
  id: number;
  currentUser: AppUser = null;
  validateForm: FormGroup;
  unEchange: Echange;
  echange: Echange;
  childrenVisible = false;

  constructor(
    private acceptationService: AcceptationService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorage,
    private echanegService: EchangeService,
  ) {
    this.currentUser = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.currentUser);
  }

  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:

        {
          this.loadEchanges();

          break;
        }
      case 1:

        {
          this.loadEchangesAactiver();

          break;
        }
      case 2:

        {
          this.loadEchangesAaccepter();

          break;
        }

      default:
        {
          this.loadEchanges();

          break;
        }

    }
  }

  ajout() {
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  resetForm(e:MouseEvent){
    e.preventDefault();
    this.validateForm.reset();
  }

  submitForm(): void {
    const formData = new FormData();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.echange = {
      id: this.id,
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

  saveEdit1(id){}
  saveEdit2(id){}
  saveEdit3(id){}

  avance1(key: number) {
    this.editCache1[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache1[key].data.photo;
    this.ngOnInitUpdate1(key);
    this.open();
  }

  avance2(key: number) {
    this.editCache2[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache2[key].data.photo;
    this.ngOnInitUpdate2(key);
    this.open();
  }

  avance3(key: number) {
    this.editCache3[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache3[key].data.photo;
    this.ngOnInitUpdate3(key);
    this.open();
  }

  ngOnInit() {
    this.loadEchanges();
    console.log(this.selectedIndex);
    this.validateForm = this.fb.group({
      proprietaires: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      tel: [null, [Validators.required]]
    });


  }

  private loadEchanges() {
    this.acceptationService.getEchanges()
      .subscribe((data: Array<Echange>) => {
        this.dataSet1 = data;
        console.log(this.dataSet1);
        this.updateEditCache1();
        console.log(this.selectedIndex);
      }, err => {
        console.log(err);
      });
  }

  private loadEchangesAactiver() {
    this.acceptationService.getEchangeAactiver()
      .subscribe((data: Array<Echange>) => {
        this.dataSet2 = data;
        console.log(this.dataSet2);
        this.updateEditCache2();
        //this.ngOnInit();
        console.log(this.selectedIndex);
      }, err => {
        console.log(err);
      });
  }


  private loadEchangesAaccepter() {
    this.acceptationService.getEchangeAaccepter()
      .subscribe((data: Array<Echange>) => {
        this.dataSet3 = data;
        console.log(this.dataSet3);
        this.updateEditCache3();
        //this.ngOnInit();
        console.log(this.selectedIndex);
      }, err => {
        console.log(err);
      });
  }


  updateEditCache1(): void {

    this.dataSet1.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache1[item.id]) {
        this.editCache1[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  updateEditCache2(): void {

    this.dataSet2.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache2[item.id]) {
        this.editCache2[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  updateEditCache3(): void {

    this.dataSet3.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache3[item.id]) {
        this.editCache3[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }
  ngOnInitUpdate1(key: number) {

    this.validateForm = this.fb.group({

      nom: [this.editCache1[key].data.nom, [Validators.required]],
      description: [this.editCache1[key].data.description, [Validators.required]],
      photo: [this.editCache1[key].data.photo, [Validators.required]],
      createdAt: [this.editCache1[key].data.createdAt, [Validators.required]],
      tel: [this.editCache1[key].data.tel, [Validators.required]],
      proprietaires: [this.editCache1[key].data.proprietaire],

    });

  }

  ngOnInitUpdate2(key: number) {

    this.validateForm = this.fb.group({

      nom: [this.editCache2[key].data.nom, [Validators.required]],
      description: [this.editCache2[key].data.description, [Validators.required]],
      photo: [this.editCache2[key].data.photo, [Validators.required]],
      createdAt: [this.editCache2[key].data.createdAt, [Validators.required]],
      tel: [this.editCache2[key].data.tel, [Validators.required]],
      proprietaires: [this.editCache2[key].data.proprietaire],

    });

  }

  ngOnInitUpdate3(key: number) {

    this.validateForm = this.fb.group({

      nom: [this.editCache3[key].data.nom, [Validators.required]],
      description: [this.editCache3[key].data.description, [Validators.required]],
      photo: [this.editCache3[key].data.photo, [Validators.required]],
      createdAt: [this.editCache3[key].data.createdAt, [Validators.required]],
      tel: [this.editCache3[key].data.tel, [Validators.required]],
      proprietaires: [this.editCache3[key].data.proprietaire],

    });

  }

  startEdit1(key: number): void {
    this.editCache1[key].edit = true;

    console.log(this.editCache1[key].data);
    //this.saveEdit(this.editCache[key].data);
  }

  startEdit2(key: number): void {
    this.editCache2[key].edit = true;

    console.log(this.editCache2[key].data);
    //this.saveEdit(this.editCache[key].data);
  }

  startEdit3(key: number): void {
    this.editCache3[key].edit = true;

    console.log(this.editCache3[key].data);
    //this.saveEdit(this.editCache[key].data);
  }

  cancelEdit1(key: number): void {
    this.editCache1[key].edit = false;

    console.log(this.editCache1[key].data);
  }

  cancelEdit2(key: number): void {
    this.editCache2[key].edit = false;

    console.log(this.editCache2[key].data);
  }

  cancelEdit3(key: number): void {
    this.editCache3[key].edit = false;

    console.log(this.editCache3[key].data);
  }
  // tableau 3
  startInspecte1(key: number) {
    this.editCache1[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache1[key].data.photo;
    this.ngOnInitUpdate1(key);
    this.open();
  }

  startInspecte2(key: number) {
    this.editCache2[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache2[key].data.photo;
    this.ngOnInitUpdate2(key);
    this.open();
  }
  startInspecte3(key: number) {
    this.id = key;
    this.editCache3[key].edit = false;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache3[key].data.photo;
    this.ngOnInitUpdate3(key);
    this.open();
  }

  //------------------ accepatation ------------------
  startAccepter(id: number) {

    this.acceptationService.patchEchangesAccepter(id).subscribe(response => this.loadEchangesAaccepter());
    console.log(id);
  }
  startActiver(id: number) {
    this.acceptationService.patchEchangesActiver(id).subscribe(res => this.loadEchangesAactiver());
  }
  startDelete1(id: number) {
    this.acceptationService.deleteEchange(id).subscribe(response => this.loadEchangesAaccepter());
    console.log(id);
  }
  startDelete2(id: number) {
    this.acceptationService.deleteEchange(id).subscribe(response => this.loadEchangesAactiver());
    console.log(id);
  }
  startDelete3(id: number) {
    this.acceptationService.deleteEchange(id).subscribe(response => this.loadEchanges());
    console.log(id);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }


  search(): void {
    const filterFunc = (item) => {
      return (item.id.indexOf(this.searchValue) !== -1
      );
    };

    const data = this.dataSet1.filter((item) => filterFunc(item));
    this.dataSet1 = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
    );
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

}
