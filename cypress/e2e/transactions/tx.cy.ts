/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(50);

describe("Transactions List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should full page (15) results", () => {
    cy.findAllByTestId("tx-row").should("have.length", 15);
  });

  it("filter by account", () => {
    cy.log("Selecting Account");
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Tahir Hagee").click();

    cy.log("Asserting reference results");
    cy.findByText(/^cavo-rilievo/i);
    cy.findByText(/^deliciate sematrope/i);
    cy.findByText(/^poling mathusian/i);
    cy.findByText(/^obtunding asonant/i);
    cy.findByText(/^manifestible/i);

    cy.log("Verifying that transaction belongs to account");
    cy.findByText(/^cavo-rilievo/i).click();
    cy.findByText(/^Cavo-rilievo Vexed Hypoderm/i);
    cy.findByDisplayValue(/^Tax Refund/i);
    cy.findByDisplayValue(/^acdcff/i);
    cy.findByText(/^Business SuperBank/i);
    cy.findByText(/^Mr. Tahir Hagee/i);
    cy.findByText(/^-£0.14/i);
    cy.findByText(/^2021-07-06/i);
  });

  it("filter by category", () => {
    cy.log("Selecting Category");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Check Outflows").click();

    cy.log("Asserting reference results");
    cy.findByTestId("tx-table").within(() => {
      cy.findAllByText(/check outflows/i).should("have.length", 15);
    });
  });

  it("filter by date", () => {
    cy.log("Selecting Date Filters");
    cy.findByTestId("date-from").type("2022-01-01");
    cy.findByTestId("date-to").type("2022-12-30");

    cy.log("Asserting that all results should be of year 2022");
    cy.findByTestId("tx-table").within(() => {
      const results = cy.findAllByText(/^2022/i);
      results.should("have.length", 15);
    });

    cy.log("Selecting Date Filters");
    cy.findByTestId("date-from").type("2021-01-01");
    cy.findByTestId("date-to").type("2021-12-30");

    cy.log("Asserting that all results should be of year 2021");
    cy.findByTestId("tx-table").within(() => {
      const results = cy.findAllByText(/^2021/i);
      results.should("have.length", 15);
    });
  });

  it("sort by date", () => {
    cy.log("Selecting filters");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Financing Income").click();
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("search-input").type("aca", { force: true });

    cy.log("Asserting results per year before sorting");
    cy.findAllByText(/^2022/i).should("have.length", 4);
    cy.findAllByText(/^2021/i).should("have.length", 10);
    cy.findAllByText(/^2020/i).should("have.length", 1);

    cy.log("Asserting results per year after sorting");
    cy.findByTestId("sort-by-date").click();
    cy.findAllByText(/^2022/i).should("have.length", 1);
    cy.findAllByText(/^2021/i).should("have.length", 10);
    cy.findAllByText(/^2020/i).should("have.length", 4);
  });

  it("should move to next page", () => {
    cy.log("Selecting filters");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Financing Income").click();
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();
    cy.findByTestId("search-input").type("aca", { force: true });

    cy.log("Asseting number of page results");
    cy.findAllByTestId("tx-row").should("have.length", 15);
    cy.findByText(/^next page/i).click();

    cy.log("Asseting number of page results after next page");
    cy.findAllByTestId("tx-row").should("have.length", 3);
  });

  it("filter search", () => {
    cy.log("Selecting Category");
    cy.findByTestId("Options-Category").click();
    cy.findByText("Check Outflows").click();

    cy.log("Selecting Account");
    cy.findByTestId("Options-Account").click();
    cy.findByText("Mr. Kevin (Bills)").click();

    cy.log("Asseting that there are 15 results");
    cy.findAllByTestId("tx-row").should("have.length", 15);

    cy.log("Asseting that after typing Strum, there are only two results");
    cy.findByTestId("search-input").type("Strum", { force: true });
    cy.findAllByTestId("tx-row").should("have.length", 2);
    cy.findByText(/Strum Canstick/i);
    cy.findByText(/Strumming Shiner/i);
  });
});
