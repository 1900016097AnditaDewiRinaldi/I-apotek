import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  user:any={};
  hide: boolean=true;
  loading: boolean | undefined;

  login()
  {
    this.loading=true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res=>{
      this.loading=false;
      this.router.navigate(['admin/dashboard']);
    }).catch(err=>{
      this.loading=false;
      alert('Tidak dapat login');
    });
  }
}
