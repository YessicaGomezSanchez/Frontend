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
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AcopioComponent } from './components/acopio-taxis/acopio-taxis.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ReporteTaxisComponent } from './components/reporte-taxis/reporte-taxis.component';
import { ReporteConductoresComponent } from './components/reporte-conductores/reporte-conductores.component';
import { ReporteUsuarioComponent } from './components/reporte-usuario/reporte-usuario.component';


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
      { path: 'listar-taxis', component: ListarTaxisComponent},
      { path: 'resporteUsuario', component: ReporteUsuarioComponent},
      { path: 'reporteTaxis', component: ReporteTaxisComponent},
      { path: 'reporteConductores', component: ReporteConductoresComponent}
    ]
},
  { path: 'usuario', component: UsuarioComponent },
  { path: 'taxis', component: AcopioComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: 'contacto', component: ContactoComponent },
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
