describe("Test log out", () => {
  // beforeEach("login to the app", () => {
  //   cy.loginToApplication();
  // });

  it.only("verify user can log out successfully", () => {
    cy.contains("Sign in").click();
    // cy.contains("Or click here to log out").click();
    // cy.get(".navbar-nav").should("contain", "sign up");
  });
});
