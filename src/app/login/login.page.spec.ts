import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar una alerta si el correo está vacío', async () => {
    component.email = '';
    component.password = '1234';

    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El campo de correo no puede estar vacío.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si el correo tiene un formato inválido', async () => {
    component.email = 'correo_invalido';
    component.password = '1234';

    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El formato del correo es inválido.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si la contraseña está vacía', async () => {
    component.email = 'test@example.com';
    component.password = '';

    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El campo de contraseña no puede estar vacío.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si la contraseña tiene más de 4 caracteres', async () => {
    component.email = 'test@example.com';
    component.password = '12345';

    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await component.login();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'La contraseña no puede tener más de 4 caracteres.',
      buttons: ['OK'],
    });
  });

  it('debería navegar a la página home si las validaciones son correctas', async () => {
    component.email = 'test@example.com';
    component.password = '1234';

    await component.login();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(['/home'], {
      queryParams: { email: 'test@example.com' , password: '1234' },
    });
  });

  it('debería navegar a la página de registro cuando se llama CrearCuenta', () => {
    component.CrearCuenta();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(['/registro']);
  });
});
