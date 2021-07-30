import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  user:any={};
  hide: boolean=true;
  
  loading: boolean | undefined;
  register()
  {
    this.loading=true;
    this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(res=>{
      this.loading=false;
      alert('Registrasi berhasil');
      this.router.navigate(['/login']);
    }).catch (err=>{
      this.loading=false;
      alert('Tidak dapat mendaftar');
    });
  }
}
