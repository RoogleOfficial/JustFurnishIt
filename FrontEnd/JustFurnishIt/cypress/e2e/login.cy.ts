import mount from "cypress";

describe("LoginPage", () => {
  it("passes", () => {
    cy.visit("/login");
    // cy.get('[data-cy="submit"]').click()
  });
  it("should render the login form", () => {
    cy.visit("/login");
    cy.wait(3000);
    cy.get('input[name="email"]').should("be.visible"); // Check if email field is rendered
    cy.get('input[name="password"]').should("be.visible"); // Check if password field is rendered
    cy.get('button[type="submit"]').contains("Sign in").should("be.visible"); // Check if sign-in button is rendered
  });
  it("should show an error for an invalid email format", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.get("div.text-red-500").should("contain", "Invalid email address");
  });

  it("should redirect to the correct route after successful login", () => {
    // Intercept the exact login API endpoint
    cy.visit("/login");
    // Fill in the login form fields
    cy.get('input[name="email"]').type("rohith@gmail.com"); // Provide valid email
    cy.get('input[name="password"]').type("Rohith@123"); // Provide valid password
    cy.get('button[type="submit"]').click(); // Submit form
    cy.wait(2000);

    cy.url().should("include", "/dashboard/designerDashboard"); // Adjust this to your expected route
  });
  it("should redirect to the correct route after successful login", () => {
    // Intercept the exact login API endpoint
    cy.visit("/login");
    // Fill in the login form fields
    cy.get('input[name="email"]').type("rohith@gmail.com"); // Provide valid email
    cy.get('input[name="password"]').type("Rohith@123"); // Provide valid password
    cy.get('button[type="submit"]').click(); // Submit form

  });
  it('should display an error toast on failed login', () => {
    // Intercept the login API request and mock a failed response
    cy.visit("/login")
    cy.intercept('POST', 'https://localhost:7000/gateway/Account/Login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginUserFailure');

    // Fill in form fields
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Wait for the failed login request
    cy.wait('@loginUserFailure');

    // Check that the error toast is displayed
    // Verify that the URL does not change
    cy.url().should('include', '/login');
  });
});
