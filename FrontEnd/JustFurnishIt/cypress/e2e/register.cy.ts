import mount from 'cypress'
describe('Register page', () => {
  it('passes', () => {
    cy.visit('/signup')
    cy.get('[data-cy="submit"]').click()
  })
})

describe('Registration Page Validations', () => {
  beforeEach(() => {
    cy.visit('/signup'); 
  });
  
  it('should show validation messages for invalid inputs', () => {
    // Check validation for empty first name
    cy.get('#firstName').focus().blur(); 
    cy.contains('First name is required').should('be.visible');
 
    // Check validation for empty last name
    cy.get('[name="lastName"]').focus().blur(); 
    cy.contains('Last name is required').should('be.visible');

    // cy.get('[name="email"]').focus().blur();
    // cy.contains('Invalid email address').should('be.visible');

   // Check validation for short password
   cy.get('[name="password"]').type('123').blur(); 
   cy.contains('Password must be at least 8 characters').should('be.visible');

   cy.get('[name="password"]').type('12345678');
   cy.get('[name="confirmPassword"]').type('1234567').blur(); 
   cy.contains('Passwords must match').should('be.visible');

    
  });


});
describe('Email OTP Verification and Form Submission', () => {
  beforeEach(() => {
    cy.visit('/signup'); 
  });

  it('should verify email using OTP before allowing form submission', () => {
    const randomString = Math.random().toString(36).substring(2, 7); // Generate a random string for uniqueness
    const email = `user_${randomString}@example.com`; // Dynamic email for each test run
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit random OTP

    // Entering first name and last name
    cy.get('input[name="firstName"]').type('John'); 
    cy.get('input[name="lastName"]').type('Doe'); 

    // Email verification via OTP
    cy.get('input[name="email"]').type(email);
    cy.contains('Get OTP').should('be.visible').click();

    // Intercepting the OTP send request
    cy.intercept('POST', 'https://localhost:7002/api/Otp/SendOtp', { statusCode: 200, body: { otpSent: true } }).as('sendOtp'); 
    cy.wait('@sendOtp');

    // Entering OTP
    cy.get('input[placeholder="Enter OTP"]').should('be.visible').type(otp);

    // Intercepting the OTP verification request
    cy.intercept('POST','https://localhost:7002/api/Otp/VerifyOtp', { statusCode: 200, body: { otpVerified: true } }).as('verifyOtp'); 
    cy.wait('@verifyOtp');

    // Ensuring email is disabled and OTP field is no longer visible
    cy.get('input[name="email"]').should('be.disabled');
    cy.get('input[placeholder="Enter OTP"]').should('not.exist');

    // Entering phone number (if applicable)
    // Replace with correct selector if phone number field is present
    // cy.get('input[placeholder="Enter phone number"]').type('+919876543210');

    // Entering password and confirm password
    cy.get('input[name="password"]').type('Chaitra@123');
    cy.get('input[name="confirmPassword"]').type('Chaitra@123');
    cy.get('input[name="terms"]').check().should('be.checked');

    // Ensure no validation messages are visible
    cy.contains('First name is required').should('not.exist');
    cy.contains('Last name is required').should('not.exist');
    cy.contains('Invalid email address').should('not.exist');
    cy.contains('Password must be at least 8 characters').should('not.exist');
    cy.contains('Passwords must match').should('not.exist');
    cy.contains('You must accept the terms and privacy policy').should('not.exist');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Successful registration leads to a welcome message
    cy.contains('User registered successfully', { timeout: 10000 }).should('be.visible');
  });
});
