/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(200);

const getRandomHexColor = () =>
  ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

describe("Transactions List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able to update category color", () => {
    cy.log("Selecting Category to assert color");
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("Options-Category").click();
    cy.findByText("Personnel").click();

    cy.log("Selecting a transaction by reference name to update color");
    cy.findByText(/^Repress Disposement Geometrical/i).click();

    cy.log("Move to transaction details page and update category color");
    const newColor = getRandomHexColor();
    cy.findByTestId("input-category-color").clear().type(newColor);
    cy.findByText("Update").click();
    cy.wait(200);

    cy.log("Move back to transactions list page");
    cy.findByText("Back").click();

    cy.log("Selecting a different transaction from the same category");
    cy.log("Selecting Category");
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("Options-Category").click();
    cy.findByText("Personnel").click();
    cy.findByText(/^Condolence Mensurable Erne/i).click();

    cy.log(
      "Asserting that other transactions in this category have the updated color"
    );
    cy.findByDisplayValue(newColor).should("exist");
  });
});
