/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(50);

describe("Transactions List Sorting", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("sort by date", () => {
    cy.log("Selecting filters");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Financing Income").click();
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("search-input").type("aca", { force: true });

    cy.log("Asserting first result");
    cy.findAllByTestId("tx-row")
      .first()
      .findByText("Acarpellous Vang Atramentous");

    cy.log("Asserting results per year before sorting");
    cy.findAllByText(/^2022/i).should("have.length", 4);
    cy.findAllByText(/^2021/i).should("have.length", 10);
    cy.findAllByText(/^2020/i).should("have.length", 1);

    cy.log("Asserting after sorting by date");
    cy.findByTestId("sort-by-date").click();
    cy.findAllByTestId("tx-row")
      .first()
      .findByText("Ataunt Acalycine Esophagean");

    cy.log("Asserting results per year after sorting");
    cy.findAllByText(/^2022/i).should("have.length", 1);
    cy.findAllByText(/^2021/i).should("have.length", 10);
    cy.findAllByText(/^2020/i).should("have.length", 4);
  });
});
