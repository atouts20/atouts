import { Compte } from './model.compte';
import { AppUser } from './model.AppUser';

export class Piece {
   
    id: number;
    fileName: string;
    fullFileName: string;
    fileType: string;
    namePiece: string;
    resumePiece: string;
    appUser: AppUser;
    createdAt: string;
 
   constructor(id: number, fileName: string, fullFileName: string, fileType: string, namePiece: string, resumePiece: string, appUser: AppUser, createdAt: string) {
     this.id = id;
     this.fileName = fileName;
     this.fullFileName = fullFileName;
     this.fileType = fileType;
     this.namePiece = namePiece;
     this.resumePiece = resumePiece;
     this.appUser = appUser;
     this.createdAt = createdAt;
   }
}
