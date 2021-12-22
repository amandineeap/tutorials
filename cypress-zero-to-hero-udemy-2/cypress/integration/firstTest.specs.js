/// <reference types="cypress"/>

describe("Test with backend", () => {
  beforeEach("login to the app", () => {
    cy.intercept({ method: "GET", path: "tags" }, { intercept: "tags.json" });
    cy.loginToApplication();
  });

  it("verify correct request and response", () => {
    cy.intercept("POST", "**/articles").as("postArticles");

    cy.contains("New Article").click();

    cy.get('[formcontrolname="title"]').type("This is a title");
    cy.get('[formcontrolname="description"]').type("This is a description");
    cy.get('[formcontrolname="body"]').type("This is a body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal("This is a body");
      expect(xhr.response.body.article.description).to.equal(
        "This is a description"
      );
    });
  });

  it("should have tags with routing objects", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .should("contain", "automation")
      .should("contain", "test");
  });

  it("verify global feed likes count", () => {
    cy.intercept("GET", "**/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });
    cy.intercept("GET", "**/articles*", { fixture: "articles.json" });

    cy.contains("Global Feed").click();
    cy.get("app-article-list button").then((listButtons) => {
      expect(listButtons[0]).to.contain("1");
      expect(listButtons[1]).to.contain("5");
    });

    cy.fixture("articles").then((file) => {
      const articleLink = file.articles[1].slug;
      cy.intercept("POST", "**/articles/" + articleLink + "/favorite", file);
    });

    cy.get("app-article-list button").eq(1).click().should("contain", "6");
  });

  it("intercepting and modifying the request and response", () => {
    // cy.intercept("POST", "**/articles", (req) => {
    //   req.body.article.description = "This one"; // intercept response and use this one
    // }).as("postArticles");

    cy.intercept("POST", "**/articles", (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal("This is a description");
        res.body.article.description = "This one";
      });
    }).as("postArticles");

    cy.contains("New Article").click();

    cy.get('[formcontrolname="title"]').type("This is a title");
    cy.get('[formcontrolname="description"]').type("This is a description");
    cy.get('[formcontrolname="body"]').type("This is a body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal("This is a body");
      expect(xhr.response.body.article.description).to.equal(
        "This is a description"
      );
    });
  });

  it("delete article", () => {
    // login user and get the token

    const bodyRequest = {
      article: {
        tagList: [],
        title: "Request from API",
        description: "API testing is easy",
        body: "Bla bla bla",
      },
    };

    cy.get("@token").then((token) => {
      // create a post
      cy.request({
        url: Cypress.env("apiUrl") + "articles/",
        headers: {
          Authorization: "Token" + token,
        },
        method: "POST",
        body: bodyRequest,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    // delete that post
    cy.contains("Global Feed").click();
    cy.get(".article-preview").first().click();
    cy.get(".article-actions").contains("Delete Article").click();

    // get the articles
    cy.request({
      url: Cypress.env("apiUrl") + "articles?limit=10&offset=0",
      headers: {
        Authorization: "Token" + token,
      },
      method: "GET",
    })
      .its("body")
      .then((body) => {
        // check that the first post title is different from the one created above
        expect(body.articles[0].title).not.to.equal("Request from API");
      });
  });
});
