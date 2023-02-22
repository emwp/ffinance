/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(50);

describe("Transactions List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have full page (15) results", () => {
    cy.findAllByTestId("tx-row").should("have.length", 15);
  });

  it("should be able go to transaction details page and back to home page", () => {
    cy.log("Selecting filters");

    cy.findByText(/^Familiar Phitoness Zincongraphic/i).click();
    const txId = "58a84ee5-1746-4223-906e-2e39949622e0";
    const host = "http://localhost:3000/";

    cy.url().should("eq", `${host}transactions/${txId}`);
    cy.findByText("Back").click();
    cy.url().should("eq", `${host}`);
  });
});
