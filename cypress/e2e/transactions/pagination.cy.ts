/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(50);

describe("Transactions List Pagination", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should move to next page", () => {
    cy.log("Selecting filters");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Financing Income").click();
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("search-input").type("aca", { force: true });

    cy.log("Asseting number of page results and first result");
    cy.findAllByTestId("tx-row").should("have.length", 15);
    cy.findAllByTestId("tx-row")
      .first()
      .findByText("Acarpellous Vang Atramentous");
    cy.findByText(/^next page/i).click();

    cy.log("Asseting number of page results after next page and first result");
    cy.findAllByTestId("tx-row").should("have.length", 3);
    cy.findAllByTestId("tx-row")
      .first()
      .findByText("Hump Absterge Acanthaceous");
  });

  it("should be able to go back to first page", () => {
    cy.log("Selecting filters");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Advertising").click();
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();

    cy.log("Asserting first result of the page");
    cy.findAllByTestId("tx-row")
      .first()
      .findByText(/^-€3,800.00/i);

    cy.log("Moving to next page");
    cy.findByText(/^next page/i).click();

    cy.log("Asserting that we got new results");
    cy.findAllByTestId("tx-row")
      .first()
      .findByText(/^-€3,800.00/i)
      .should("not.exist");

    cy.log("Moving back to first page");
    cy.findByText(/^first page/i).click();

    cy.log("Asserting result of the first page");
    cy.findAllByTestId("tx-row")
      .first()
      .findByText(/^-€3,800.00/i);
  });
});
