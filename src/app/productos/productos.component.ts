import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Variedad } from '../models/variedad'
import { Grado } from '../models/grado'
import { ProductoService } from './service/producto.service';
import { Producto } from '../models/producto';
import { ImagenProducto } from '../models/imagen-producto';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ProductosComponent implements OnInit {

  public fileUpload : ImagenProducto;
  public ListVariedad: any[] | undefined;
  public ListGrado: any[] | undefined;
  public ListColor: any[] | undefined;
  public ListVariedadSave: Variedad[]=[];
  public ListGradoSave: Grado[]=[];
  public ListVariedades: any[]=[];
  public ObjVariedad: Variedad | undefined;
  public ObjGrado: Grado | undefined;
  public ObjProducto: Producto | undefined;
  public message: string | undefined;
  public clases: string | undefined;
  clickSubmit: boolean =false;
  clickSubmitVariedad: boolean =false;
  clickSubmitGrado: boolean =false;
  errorVariedad = false;
  show = false;
  

  constructor(
    private productoServices: ProductoService,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    public fb: FormBuilder,
    public fgVariedad: FormBuilder,
    public fgcolor: FormBuilder,) {  
    config.backdrop = 'static';
		config.keyboard = false;
    this.fileUpload = new ImagenProducto();
   }

   registrationForm = this.fb.group({    
    id: [''],
    nombre: ['', [Validators.required]],
    especie: ['', [Validators.required]],
    archivo: ['', [Validators.required]]    
  });  

  variedadForm = this.fgVariedad.group({
    id: [''],
    variedad: ['', [Validators.required]],
    color: ['', [Validators.required]]
  });

  gradoForm = this.fgcolor.group({
    id: [''],
    grado: ['', [Validators.required]]    
  })

  ngOnInit(): void {        
    this.message = "Se registro exitosamente."
    this.clases = "bg-success text-light"
    this.getColor();
    this.getGrados();
    this.getVariedad();
  }

  getColor(){
    this.productoServices.getColor().subscribe(
      (resp)=>{
        this.ListColor = resp;
      },      
      error => console.log(error),      
    );    
  }

  getGrados(){
    this.productoServices.getGrados().subscribe(
      (resp)=>{
        this.ListGrado = resp;
      },      
      error => console.log(error),      
    );    
  }

  getVariedad(){    
    this.productoServices.getVariedad().subscribe(
      (resp)=>{
        this.ListVariedad = resp;
      },      
      error => console.log(error),      
    );    
  }

  onUploadFile(event:any): void{   
    if (event.target.files[0]) {
      this.fileUpload.nombre =event.target.files[0].name;
      let reader = new FileReader();      
      reader.onload = e => this.fileUpload.img = reader.result;
      reader.readAsDataURL(event.target.files[0]);
      this.fileUpload.img = this.fileUpload; 
    }
  }

  onSubmit(): void{    
    this.clickSubmit = true;    
    if(this.registrationForm.valid){
      this.ObjProducto = new Producto();      
      this.ObjProducto.nombre = this.registrationForm.value.nombre;
      this.ObjProducto.especie = this.registrationForm.value.especie;
      this.ObjProducto.urlarchivo = this.fileUpload;
      this.ObjProducto.variedades = this.ListVariedadSave;
      this.ObjProducto.grados = this.ListGradoSave;
      this.productoServices.postSaveProductos(this.ObjProducto).subscribe(
        (resp)=>{
          this.ListGrado = resp;
          if(resp){
            this.message = "Se registro exitosamente."
            this.clases = "bg-success text-light"
            this.show = true;
            this.registrationForm.reset();
            this.registrationForm = this.fb.group({    
              id: [''],
              nombre: ['', [Validators.required]],
              especie: ['', [Validators.required]],
              archivo: ['', [Validators.required]]    
            });    
            this.ListVariedadSave = [];
            this.ListGradoSave = [];
            this.clickSubmit = false;  
            this.fileUpload = new ImagenProducto();
          }else{
            this.message = "Error al registrar"
            this.clases = "bg-danger text-light"
            this.show = true;
          }
        },      
        error => console.log(error),      
      );    
    }
  }



  onAddVariedad():void {
    this.clickSubmitVariedad = true;
    
    if(this.ListVariedadSave.find(x=> x.idVariedad == this.variedadForm.value.variedad && x.idColor == this.variedadForm.value.color )){      
      this.errorVariedad = true;
      return;
    }

    if(this.variedadForm.valid){

      this.modalService.dismissAll();
      this.ObjVariedad = new Variedad();
      
      this.ObjVariedad.id =this.ListVariedadSave.length == 0? 1: Number(this.ListVariedadSave.length+1);
      this.ObjVariedad.idVariedad = Number(this.variedadForm.value.variedad);
      this.ObjVariedad.variedad = this.ListVariedad?.find(x=> x.id == this.variedadForm.value.variedad).name;
      this.ObjVariedad.idColor = Number(this.variedadForm.value.color);
      this.ObjVariedad.color = this.ListColor?.find(x=> x.id == this.variedadForm.value.color).name;
      this.ListVariedadSave.push(this.ObjVariedad);
      this.resetForm()   
      this.errorVariedad = false;
    }
  }

  onDeleteVariedad(index:any):void {
    this.ListVariedadSave.splice(index,1);
  }

  onAddGrado():void {    
    this.clickSubmitGrado = true;
    this.ObjGrado = new Grado();

    if(this.ListGradoSave.find(x=> x.idGrado == this.gradoForm.value.grado)){
      this.gradoForm.controls['grado'].setErrors({ 'incorrect': true});              
      return;
    }

    if(this.gradoForm.valid){

      this.modalService.dismissAll();   
      
      this.ObjGrado = new Grado();
      
      this.ObjGrado.id = this.ListGradoSave.length == 0? 1: Number(this.ListGradoSave.length+1);
      this.ObjGrado.idGrado = Number(this.gradoForm.value.grado);
      this.ObjGrado.grado = this.ListGrado?.find(x=> x.id == this.gradoForm.value.grado).name;      
      this.ListGradoSave.push(this.ObjGrado);   
      this.resetForm()   
    }
  }

  resetForm(){    
    this.variedadForm = this.fgVariedad.group({
      id: [''],
      variedad: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });

    this.gradoForm = this.fgcolor.group({
      id: [''],
      grado: ['', [Validators.required]]    
    });
  }

  onDeleteGrado(index:any):void {
    this.ListGradoSave.splice(index,1);
  }

  open(content:any) {
    this.clickSubmitVariedad = false;
		this.modalService.open(content);
	}

  openColor(contentColor:any) {
    this.clickSubmitGrado = false;
		this.modalService.open(contentColor);    
	}
  
}
