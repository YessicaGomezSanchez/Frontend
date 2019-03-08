import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{IniciarSesionComponent} from './components/iniciar-sesion/iniciar-sesion.component';
import{PerfilComponent} from './components/perfil/perfil.component';
import{RestablecerContrasenaComponent} from './components/restablecer-contrasena/restablecer-contrasena.component';
import{ServiciosComponent} from './components/servicios/servicios.component';
import{TaxisComponent} from './components/taxis/taxis.component';
import{UsuariosComponent} from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
{path:'sesion',component:IniciarSesionComponent},
{path:'perfil',component:PerfilComponent},
{path:'restablecer',component:RestablecerContrasenaComponent},
{path:'servicios',component:ServiciosComponent},
{path:'taxis',component:TaxisComponent},
{path:'usuarios',component:UsuariosComponent},
{path:'dashboard',component:DashboardComponent},
{path:'**',component:HomeComponent},
{path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
