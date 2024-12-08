describe('RegistroPage', () => {
  beforeEach(() => {
    // Antes de cada prueba, visitamos la página de registro.
    cy.visit('/registro'); // Asegúrate de que la ruta coincida con la de tu aplicación.
  });

 

  it('should show a success message on successful registration', () => {
    // Llena el formulario con datos válidos.
    cy.get('[data-testid="nombre-input"]').type('John');
    cy.get('[data-testid="apellido-input"]').type('Doe');
    cy.get('[data-testid="usuario-input"]').type('john_doe');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="nivel-educacion-select"]').select('Universitario');
    cy.get('[data-testid="fecha-input"]').type('1990-01-01');

    // Haz clic en el botón guardar.
    cy.get('[data-testid="guardar-button"]').click();

    // Verifica que se muestre un mensaje de éxito.
    cy.get('ion-alert').should('be.visible').contains('Registro exitoso');

    // Cierra el alert.
    cy.get('ion-alert .alert-button').click();
  });

  it('should show an error message on failed registration', () => {
    // Simula un fallo en el registro llamando un endpoint simulado.
    cy.intercept('POST', '/api/register', { statusCode: 500 });

    // Llena el formulario con datos válidos.
    cy.get('[data-testid="nombre-input"]').type('John');
    cy.get('[data-testid="apellido-input"]').type('Doe');
    cy.get('[data-testid="usuario-input"]').type('john_doe');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="nivel-educacion-select"]').select('Universitario');
    cy.get('[data-testid="fecha-input"]').type('1990-01-01');

    // Haz clic en el botón guardar.
    cy.get('[data-testid="guardar-button"]').click();

    // Verifica que se muestre un mensaje de error.
    cy.get('ion-alert').should('be.visible').contains('Error al registrar');

    // Cierra el alert.
    cy.get('ion-alert .alert-button').click();
  });
});
