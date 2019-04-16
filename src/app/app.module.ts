// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ListarTaxisComponent
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
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
