// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { MatCardModule, MatButtonModule, MatInputModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSelectModule, MatFormFieldModule } from '@angular/material';

// Componentes
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RestablecerContrasenaComponent } from './components/restablecer-contrasena/restablecer-contrasena.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TaxisComponent } from './components/taxis/taxis.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarTaxisComponent } from './components/listar-taxis/listar-taxis.component';
import { ToastrComponent } from './components/shared/toastr/toastr.component';


@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RestablecerContrasenaComponent,
    PerfilComponent,
    UsuariosComponent,
    TaxisComponent,
    ServiciosComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    CrearUsuariosComponent,
    ListarTaxisComponent,
    ToastrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatListModule,    
    ToastrModule.forRoot()
    ],
  providers: [ToastrComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
