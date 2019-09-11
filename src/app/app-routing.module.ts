import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RestablecerContrasenaComponent } from './components/restablecer-contrasena/restablecer-contrasena.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { TaxisComponent } from './components/taxis/taxis.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { ListarTaxisComponent } from './components/listar-taxis/listar-taxis.component';

// Security
import { LoginGuard } from './auth/login.guard';
import { NoLoginGuard } from './auth/no-login.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'perfil', component: PerfilComponent},
      { path: 'servicios', component: ServiciosComponent},
      { path: 'taxis', component: TaxisComponent},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'crear-usuarios', component: CrearUsuariosComponent},
      { path: 'listar-taxis', component: ListarTaxisComponent}
    ]

},
    { path: 'sesion', component: IniciarSesionComponent},
    { path: 'restablecer', component: RestablecerContrasenaComponent },
    { path: '**', component: HomeComponent },
    { path: '', component: HomeComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
