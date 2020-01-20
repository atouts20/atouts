import { Component, OnInit } from '@angular/core';
import { Groupe } from '../../../../model/model.groupe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../service/authentication.service';
import { GrouperService } from '../../../../service/grouper.service';
import { GroupeService } from '../../../../service/groupe.service';
import { Grouper } from '../../../../model/model.grouper';
import { CleGrouper } from '../../../../model/model.cleGrouper';
import { AppUser } from '../../../../model/model.AppUser';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  visible = false;
  validateForm: FormGroup;

  options;
  optionsC;
  dataSet1 = [];

  editCache1 = {};

  edit: boolean = false;

  partmn;
  partvl;

  finish: boolean;

  childrenVisible = false;
  i = 1;
  editCache = {};

  dataSet = [];

  nom: string;
  dat;
  num: string

  today = new Date();
  jstoday = '';

  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };

  sortName = null;
  sortValue = null;
  searchValue = '';
  searchAddress = [];


  nouv: boolean = false;

  selectedclient: AppUser;

  sommemn: number = 0;
  sommevl: number = 0;
  idUser;

  pkGrouper: CleGrouper;
  groupe: Groupe;
  grouper: Grouper;
  idGp;
  index = null;
  idtest;
  nocent: boolean = false;
  cent: boolean = false;
  depass: boolean = false;
  user: AppUser = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private grouperService: GrouperService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private groupeService: GroupeService,
    private tokenStorage: TokenStorage,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {
    this.dataSet = [];
    this.updateEditCache();

    let nom = btoa(this.user.nom);

    let dat = new Date().getTime();

    let num = "G" + nom + dat;

    this.validateForm = this.fb.group({

      id: [num, [Validators.required]],
      nomGroupe: [null, [Validators.required]],
      appUser: [null, [Validators.required]],
      partmn: [null, [Validators.required]],
      partvl: [null, [Validators.required]],
    });


    this.authService.getUtilisateur()
      .subscribe((data: Array<AppUser>) => {
        this.optionsC = data;
        console.log(this.optionsC);
      },
        err => {
          console.log(err);
        })


    this.loadGroupe();

    this.groupeService.newUserStream.subscribe(data => this.loadGroupe());


  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  submitForm(): void {
    this.sommemn = 0;
    this.sommevl = 0;
    this.index = 0;
    console.log(this.validateForm.value);


    let k = 0;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      k++;
    }
    console.log(k);

    this.pkGrouper = { appUser_id: this.validateForm.value.appUser.id, groupe_id: this.validateForm.value.id };

    // this.somme = this.somme + this.validateForm.value.part;

    this.groupe = {
      id: this.validateForm.value.id,
      nomGroupe: this.validateForm.value.nomGroupe
    };

    this.grouper = {
      pkGrouper: this.pkGrouper,
      partmn: this.validateForm.value.partmn,
      partvl: this.validateForm.value.partvl,
      groupe: this.groupe,
      appUser: this.validateForm.value.appUser
    };


    this.idGp = this.validateForm.value.id;

    this.idtest = this.grouper.pkGrouper.appUser_id;

    this.partmn = this.validateForm.value.partmn;
    this.partvl = this.validateForm.value.partvl;

    console.log(this.grouper);

    this.index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === this.idtest);
    console.log(this.index);

    console.log(this.validateForm.value.partmn);
    console.log(this.validateForm.value.partvl);

    if (this.dataSet.length == 0) {

      if (k !== 0) {
        this.dataSet = [...this.dataSet, this.grouper];
        this.updateEditCache();
      }

      this.dataSet.forEach(item => {
        this.sommemn = this.sommemn + item.partmn * 1;
      });

      this.dataSet.forEach(item => {
        this.sommevl = this.sommevl + item.partvl * 1;
      });

      /* this.somme = this.somme + this.validateForm.value.part*1; */
      console.log(this.dataSet);

    } else {

      if (this.index == -1) {
        /*  this.somme = this.somme + this.part*1; */
        console.log(this.sommemn);
        console.log(this.sommevl);


        if (k !== 0) {
          this.dataSet = [...this.dataSet, this.grouper];
          this.updateEditCache();
        }

        this.dataSet.forEach(item => {
          this.sommemn = this.sommemn + item.partmn * 1;
        });

        this.dataSet.forEach(item => {
          this.sommevl = this.sommevl + item.partvl * 1;
        });

        console.log(this.dataSet);

      } else {
        this.dataSet.forEach(item => {
          this.sommemn = this.sommemn + item.partmn * 1;
        });

        this.dataSet.forEach(item => {
          this.sommevl = this.sommevl + item.partvl * 1;
        });

        console.log(this.dataSet);

      }

    }


    if (this.sommemn < 1 || this.sommevl < 1) {
      this.nocent = true;
      this.depass = false;
      this.cent = false;
    }
    if (this.sommemn > 1 || this.sommevl > 1) {
      this.depass = true;
      this.nocent = false;
      this.cent = false;
    }
    if (this.sommemn == 1 && this.sommevl == 1) {
      this.cent = true;
    }

    /* if (k !== 0) {
        this.dataSet = [ ...this.dataSet,  this.grouper ];
        this.updateEditCache();          
    } */
    console.log(this.sommemn);
    console.log(this.sommevl);
  }



  valider() {

    if (this.edit) {

      if (this.sommemn == 1 && this.sommevl == 1) {

        let groupe = {
          id: this.validateForm.value.id,
          nomGroupe: this.validateForm.value.nomGroupe,
          //groupers:this.dataSet 
        };

        console.log(groupe);

        this.groupeService.putGroupe(groupe)
          .subscribe(
            res => {
              console.log(res);


              this.dataSet.forEach(item => {

                this.grouperService.postGroupers(item)
                  .subscribe(
                    res => {
                      console.log(res);

                    },
                    err => {
                      console.log(err);
                    }
                  );

              });


              this.loadGroupe();
              //this.dataSet = [];
              //this.editCache = {};
              //this.somme=0;
              this.depass = false;
              this.nocent = false;

            },
            err => {
              console.log(err);
            }
          );
      }

    } else {


      if (this.sommemn == 1 && this.sommevl == 1) {

        console.log(this.groupe);

        this.groupeService.postGroupes(this.groupe)
          .subscribe(
            res => {
              console.log(res);

              console.log(this.dataSet);
              this.dataSet.forEach(item => {

                this.grouperService.postGroupers(item)
                  .subscribe(
                    res => {
                      console.log(res);

                    },
                    err => {
                      console.log(err);
                    }
                  );

              });

              /*  if(!this.edit){ */
              this.resegroupe();
              /*  }else{
                 this.loadGroupe();
                this.dataSet = [];
                this.editCache = {};
                this.somme=0;
               this.depass=false; 
               this.nocent=false;
               } */


            },
            err => {
              console.log(err);
            }
          );

      }

    }

  }


  resegroupe() {
    this.ngOnInit();
    this.dataSet = [];
    this.editCache = {};
    this.sommemn = 0;
    this.sommevl = 0;
    this.depass = false;
    this.nocent = false;
  }


  cancelEdit1(key: string): void {
    this.editCache1[key].edit = false;
    console.log(this.editCache1[key].data);
  }


  saveEdit1(key: string): void {
    const index = this.dataSet1.findIndex(item => item.id === key);

    console.log("11111111");
    console.log(this.dataSet1[index]);
    console.log("11111111");

    console.log("22222222");
    console.log(this.editCache1[key].data);
    console.log("22222222");


    this.groupeService.putGroupeN(this.editCache1[key].data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });

    Object.assign(this.dataSet1[index], this.editCache1[key].data);
    this.editCache1[key].edit = false;
  }


  delete1(key: string) {
    this.groupeService.deleteGroupe(key)
      .subscribe(data => {
        console.log(data);
        this.loadGroupe();
      }, err => {
        console.log(err);
      })
  }


  updateEditCache(): void {
    this.dataSet.forEach(item => {
      /* if (!this.editCache[item.pkGrouper.appUser_id]) { */
      this.editCache[item.pkGrouper.appUser_id] = {
        edit: false,
        data: { ...item }
      };
      // }
    });
  }



  updateEditCache1(): void {
    this.dataSet1.forEach(item => {
      if (!this.editCache1[item.id]) {
        this.editCache1[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  ajout() {
    this.nouv = true;
    this.edit = false;
    this.sommemn = 0;
    this.sommevl = 0;;
    this.ngOnInit();
    this.open();
  }



  avance(key: string) {
    this.edit = true;
    console.log(this.edit);
    console.log(this.editCache1[key].data.nomGroupe);
    //this.dataSet=[];
    this.editCache1[key].edit = false;
    this.sommemn = 0;
    this.sommevl = 0;
    this.ngOnInitUpdate(key);

    /*  this.dataSet.forEach(item => { 
       this.somme = this.somme + item.part*1;
     }) */





    this.open();
  }



  startEdit(key: number): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data)
  }

  startEdit1(key: string): void {
    this.editCache1[key].edit = true;
    console.log(this.editCache1[key].data);
  }

  cancelEdit(key: number): void {
    this.editCache[key].edit = false;
    console.log(this.editCache[key].data);
  }


  saveEdit(key: number): void {
    this.sommemn = 0;
    this.sommevl = 0;
    const index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === key);

    console.log("11111111");
    console.log(this.dataSet[index]);
    console.log("11111111");

    console.log("22222222");
    console.log(this.editCache[key].data);
    console.log("22222222");

    Object.assign(this.dataSet[index], this.editCache[key].data);
    this.editCache[key].edit = false;


    this.dataSet[index] = this.editCache[key].data;
    this.updateEditCache();
    console.log(this.dataSet);


    this.dataSet.forEach(item => {
      this.sommemn = this.sommemn + item.partmn * 1;
    })

    this.dataSet.forEach(item => {
      this.sommevl = this.sommevl + item.partvl * 1;
    })


    if (this.sommemn < 1 || this.sommevl < 1) {
      this.nocent = true;
      this.depass = false;
      this.cent = false;
    }
    if (this.sommemn > 1 || this.sommevl > 1) {
      this.depass = true;
      this.nocent = false;
      this.cent = false;
    }
    if (this.sommemn == 1 && this.sommevl == 1) {
      this.cent = true;
    }


  }



  delete(key: number) {
    /* const index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === key);
    this.dataSet[index].pkGrouper.appUser_id;
    this.dataSet[index].pkGrouper.groupe_id; */


    this.sommemn = 0;
    this.sommevl = 0;
    const dataSet = this.dataSet.filter(d => d.pkGrouper.appUser_id !== key);
    this.dataSet = dataSet;

    this.dataSet.forEach(item => {
      this.sommemn = this.sommemn + item.partmn * 1;
    })

    this.dataSet.forEach(item => {
      this.sommevl = this.sommevl + item.partvl * 1;
    })

    console.log(this.dataSet);

    if (this.sommemn < 1 || this.sommevl < 1) {
      this.nocent = true;
      this.depass = false;
      this.cent = false;
    }
    if (this.sommemn > 1 || this.sommevl > 1) {
      this.depass = true;
      this.nocent = false;
      this.cent = false;
    }
    if (this.sommemn == 1 && this.sommevl == 1) {
      this.cent = true;
    }

  }


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }


  ngOnInitUpdate(key: string) {
    console.log(this.edit);

    //this.loadGrouper(key);

    this.validateForm = this.fb.group({
      id: [this.editCache1[key].data.id, [Validators.required]],
      nomGroupe: [this.editCache1[key].data.nomGroupe, [Validators.required]],
      // nomGroupe: [this.editCache1[key].data.nomGroupe, [Validators.required]],
      appUser: [null, [Validators.required]],
      partmn: [null, [Validators.required]],
      partvl: [null, [Validators.required]],
    });

    this.loadGrouper(key);

  }


  loadGrouper(id: string) {
    this.grouperService.getGrouper(id)
      .subscribe((data: Array<Grouper>) => {
        this.dataSet = data;
        this.updateEditCache();

        console.log(this.dataSet[1].groupe.nomGroupe);

        this.editCache1[id].data.nomGroupe = this.dataSet[1].groupe.nomGroupe;


        this.dataSet.forEach(item => {
          this.sommemn = this.sommemn + item.partmn * 1;
        })

        this.dataSet.forEach(item => {
          this.sommevl = this.sommevl + item.partvl * 1;
        })


        if (this.sommemn < 1 || this.sommevl < 1) {
          this.nocent = true;
          this.depass = false;
          this.cent = false;
        }
        if (this.sommemn > 1 || this.sommevl > 1) {
          this.depass = true;
          this.nocent = false;
          this.cent = false;
        }
        if (this.sommemn == 1 && this.sommevl == 1) {
          this.cent = true;
        }


        console.log(data);


        console.log(this.dataSet);
      }, err => {
        console.log(err);
      });
  }

  loadGroupe() {
    this.groupeService.getGroupe()
      .subscribe((data: Array<Groupe>) => {
        this.dataSet1 = data;
        console.log(data);
        this.dat = data;
        this.updateEditCache1();
        console.log(this.dataSet1);
      }, err => {
        console.log(err);
      });
  }


  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[key] = (key === sortName ? value : null);
    }
    this.search();
  }


  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }


  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(id => item.id.indexOf(id) !== -1) : true) &&
        (item.id.indexOf(this.searchValue) !== -1);
    };
    const data = this.dat.filter(item => filterFunc(item));
    this.dataSet1 = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }
}
