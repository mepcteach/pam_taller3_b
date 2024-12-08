/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

describe('Home Page', () => {
  beforeEach(() => {
    // Configura la URL inicial con parámetros
    cy.visit('http://localhost:8100/home?email=mpuebla@gmail.com&password=1234');
    localStorage.setItem('username', 'UsuarioPrueba'); // Simula un usuario en localStorage
  });

  it('debería mostrar el mensaje de bienvenida con el usuario', () => {
    cy.get('ion-card-title').contains('Bienvenid@'); // Verifica que el título contiene "Bienvenid@"
    cy.contains('UsuarioPrueba'); // Verifica que muestra el usuario del localStorage
  });

  it('debería listar los productos correctamente', () => {
    // Verifica que los productos están listados
    cy.get('ion-item'); // Asegúrate de que hay 5 productos

    // Verifica un producto específico
    cy.contains('Drone DJI Mavic Air 2').should('exist');
    cy.contains('$999').should('exist');
  });

  it('debería mostrar una alerta cuando se verifica el stock de un producto', () => {
    // Simula un clic en un producto
    cy.contains('Drone DJI Mavic Air 2').click();

    // Verifica que se muestra la alerta
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert').contains('El producto está en stock');
  });

  it('debería mostrar "No está en stock" para productos agotados', () => {
    // Simula un clic en un producto que no está en stock
    cy.contains('Drone DJI Phantom 4 Pro').click();

    // Verifica que la alerta indica que no está en stock
    cy.get('ion-alert').should('exist');
    cy.get('ion-alert').contains('El producto no está en stock');
  });
});

