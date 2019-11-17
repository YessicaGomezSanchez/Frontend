// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCardModule, MatButtonModule, MatInputModule,
  MatMenuModule, MatToolbarModule, MatIconModule, MatSelectModule,
  MatFormFieldModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

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
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarTaxisComponent } from './components/listar-taxis/listar-taxis.component';
import { ToastrComponent } from './components/shared/toastr/toastr.component';
import { MomentModule } from 'ngx-moment';
import { HeaderComponent } from './components/nabvar/header/header.component';
import { FooterComponent } from './components/nabvar/footer/footer.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AcopioComponent } from './components/acopio-taxis/acopio-taxis.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ReporteUsuarioComponent } from './components/reporte-usuario/reporte-usuario.component';
import { ReporteTaxisComponent } from './components/reporte-taxis/reporte-taxis.component';
import { ReporteConductoresComponent } from './components/reporte-conductores/reporte-conductores.component';
import { PopupUsuariosComponent } from './components/pop-up/popup-usuarios/popup-usuarios.component';

import { ExcelService } from './services/excel.service';

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
    CrearUsuariosComponent,
    ListarTaxisComponent,
    ToastrComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    AcopioComponent,
    HistoriaComponent,
    ContactoComponent,
    ReporteUsuarioComponent,
    ReporteTaxisComponent,
    ReporteConductoresComponent,
    PopupUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MomentModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatListModule,
    ToastrModule.forRoot()
    ],
  providers: [ToastrComponent, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
