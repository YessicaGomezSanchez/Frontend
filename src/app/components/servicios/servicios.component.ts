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
  asignado: Boolean;
  public nombre: string;
  public apellidos: string;
  public direccion: string;
  public numeroCelular: string;
  cod_servicio = Math.floor((Math.random() * 10000) + 1);
  taxisListD: [];
  formServicio: FormGroup;
  submitted = false;

  constructor(
    public toastr: ToastrComponent,
    private servicio: ServiciosService,
    private taxiService: TaxisService,
    private usuario: UsuariosService,
    private formBuilder: FormBuilder) { }


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
      observaciones: ['', [Validators.required]],
      codTaxi: ['', [Validators.required]],
    });
  }
  get validador() {
    return this.formServicio.controls;
  }
  guardarServicio(formServicio: any) {
    this.submitted = true;
    if (this.formServicio.invalid) {
      console.log(this.formServicio.invalid);
      return this.toastr.showError('Complete los campos resaltados', 'Campos obligatorios');
    } else {
      const dataServicio =
      {
        cod_servicio: this.cod_servicio,
        nombres: formServicio.value.nombre,
        apellidos: formServicio.value.apellidos,
        direccion: formServicio.value.direccion,
        telefono: formServicio.value.numeroCelular,
        cod_operador: this.id,
        observaciones: formServicio.value.observaciones,
        cod_taxi: this.selected,
        fecha_servicio: '2019-05-01',
        pvx: true,

      }
      const dataTaxi =
      {
        placa: this.selected,
        asignado: false
      }


      this.servicio.postServicio(dataServicio).subscribe(data => {
        this.toastr.showSuccess('El servicio fué creado', 'Exito!');
      },
        error => {
          if (error.status == 404) {
            this.toastr.showError(error.message, 'Ups!');
          } else {
            this.toastr.showError(error.message, 'Ups!');
          }
        }

      );
      this.taxiService.putTaxi(dataTaxi).subscribe(data => {
        console.log("POST Request is successful ", data);
        console.log(data);
        this.listarServicios();
        this.taxisDisponibles();
      },
        error => {
          console.log("Error", error);
        }
      );

    }
    formServicio.reset();
    this.submitted = false;
  }

  buscarUsuario(formServicio: any): void {
    const id = formServicio.value.nomBusqueda;
    this.usuario.getUsuario(id).subscribe(data => {
      this.nombre = data.nombres;
      this.apellidos = data.apellidos,
        this.direccion = data.direccion,
        this.numeroCelular = data.numero_celular,
        this.toastr.showSuccess('El usuario fué encontrado', 'Encontrado!');
    },
      error => {
        if (error.status == 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups!');
        }

      })
  }

  listarServicios() {
    this.servicio.getAllServicio().subscribe((data: any) => {
      this.listServicio = data;
    },
      error => {
        if (error.status == 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups!');
        }

      });
  }
  enturnar() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisList = data.filter(res => res.habilitado == true && res.asignado == false);

    },
      error => {
        if (error.status == 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups!');
        }

      });
  }

  taxisDisponibles() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisListD = data.filter(res => res.habilitado == true && res.asignado == true);

    },
      error => {
        if (error.status == 404) {
          this.toastr.showError(error.message, 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups!');
        }

      });
  }

  guardarturno(list: any) {
    this.enturnados = list.selectedOptions.selected.map(item => item.value);

    for (let i = 0; i < this.enturnados.length; i++) {
      let data =
      {
        placa: this.enturnados[i],
        asignado: true
      }
      this.taxiService.putTaxi(data).subscribe(data => {
        this.taxisDisponibles();
        this.toastr.showSuccess('Los taxis fueron enturnados', 'Exito!');
      },
        error => {
          if (error.status == 404) {
            this.toastr.showError(error.message, 'Ups!');
          } else {
            this.toastr.showError(error.message, 'Ups!');
          }

        }

      );
    }
  }

}
