import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any; 
  Obat: any={};
  I_Apotek:any={}; 
  userData:any={};
  constructor(
    public dialog:MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) {}
 

  ngOnInit(): void {
    this.title='Kartu Stock Obat';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getI_Apotek();
    });
  }
  loading: boolean | undefined;
  getI_Apotek() {
    this.loading=true;
    this.db.collection('I_Apotek', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.I_Apotek=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }

  productDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(ProductDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe((res: any)=>{
    return; 
   })
 }
 
 loadingDelete:any={};
  deleteProduct(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('I_Apotek').doc(id).delete().then(res=>{
        this.I_Apotek.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }
}
