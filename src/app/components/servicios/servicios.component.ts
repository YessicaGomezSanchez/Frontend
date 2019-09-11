import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TaxisService } from 'src/app/services/taxis.service';
import { ToastrComponent } from '../shared/toastr/toastr.component';



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  id = localStorage.getItem('idUsuario');
  selected: string;
  enturnados: [];
  taxisList: [];
  listServicio = [];
  asignado: boolean;
  nombre: string;
  apellidos: string;
  direccion: string;
  numeroCelular: string;
  taxisListD: [];
  formServicio: FormGroup;
  submitted = false;
  constructor(
    public toastr: ToastrComponent,
    private servicio: ServiciosService,
    private taxiService: TaxisService,
    private usuario: UsuariosService,
    private formBuilder: FormBuilder) {

  }


  ngOnInit() {
    this.listarServicios();
    this.taxisDisponibles();
    this.validarCampos();

  }

  validarCampos() {
    this.formServicio = this.formBuilder.group({
      nomBusqueda: [''],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      direccion: ['', [Validators.required]],
      numeroCelular: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(7)]],
      observaciones: ['', []],
      codTaxi: ['', [Validators.required]],
    });
  }
  get validador() {
    return this.formServicio.controls;
  }
  guardarServicio(formServicio: any) {
    this.submitted = true;
    if (this.formServicio.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
    } else {
      var fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0);
      const dataServicio = {
        nombres: formServicio.value.nombre,
        apellidos: formServicio.value.apellidos,
        direccion: formServicio.value.direccion,
        telefono: formServicio.value.numeroCelular,
        cod_operador: this.id,
        observaciones: formServicio.value.observaciones,
        cod_taxi: this.selected,
        fecha_servicio: fechaActual,
        pvx: true,

      };

      const dataTaxi = {
        placa: this.selected,
        asignado: false
      };

      this.servicio.postServicio(dataServicio).subscribe(data => {
        this.toastr.showSuccess('El servicio fué creado', 'Exito!');
        this.listarServicios();
      },
      error => {
        if (error.status === 404) {
          this.toastr.showError('Error en el servidor intente más tarde', 'Ups!');
        } else if (error.status === 500 && error.error.msn.code === 11000) {
          this.toastr.showError('El Servicio ya fué creado', 'Ups!');
        }
      });

      this.taxiService.putTaxi(dataTaxi).subscribe(data => {
        this.listarServicios();
        this.taxisDisponibles();
      },
        error => {
          if (error.status === 404) {
            this.toastr.showError(error.message, 'Ups!');
          } else {
            this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
          }
        }
      );
    }
    formServicio.reset();
    this.submitted = false;
  }

  buscarUsuario(formServicio: any): void {
    const id = formServicio.value.nomBusqueda;
    if (id === '') {
      this.toastr.showWarning('Debe ingresar un número de documento para realizar la búsqueda', 'Ups!');
    } else {
      this.usuario.getUsuario(id).subscribe(data => {
        this.nombre = data.nombres;
        this.apellidos = data.apellidos,
          this.direccion = data.direccion,
          this.numeroCelular = data.numero_celular,
          this.toastr.showSuccess('El usuario fué encontrado', 'Encontrado!');
      },
        error => {
          if (error.status === 404) {
            this.toastr.showError(error.error.message, 'Ups!');
          } else {
            this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
          }
        });
    }
  }

  listarServicios() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    this.servicio.getAllServicio().subscribe((data: any) => {
      console.log('fecha servicio', data);
      this.listServicio = data.filter(filtro => filtro.cod_operador === this.id);
      console.log('today', today);
    },
      error => {
        if (error.status === 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
        }
      });
  }
  enturnar() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisList = data.filter(res => res.habilitado === true && res.asignado === false);
    },
      error => {
        if (error.status === 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
        }

      });
  }

  taxisDisponibles() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisListD = data.filter(res => res.habilitado === true && res.asignado === true);

    },
      error => {
        if (error.status === 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
        }

      });
  }

  guardarturno(list: any) {
    this.enturnados = list.selectedOptions.selected.map(item => item.value);

    for (let i = 0; i < this.enturnados.length; i++) {
      let data = {
        placa: this.enturnados[i],
        asignado: true
      };

      this.taxiService.putTaxi(data).subscribe(data => {
        this.taxisDisponibles();
        this.toastr.showSuccess('Los taxis seleccionados fueron enturnados exitosamente', 'Taxis enturnados!');
      },
        error => {
          if (error.status === 404) {
            this.toastr.showError(error.message, 'Ups!');
          } else {
            this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
          }
        }
      );
    }
  }
}
