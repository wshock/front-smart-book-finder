import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import assert from "node:assert/strict";

setDefaultTimeout(60000);

const APP_URL = "http://localhost:5173";

let browser;
let page;
let lastSearchResponse;

async function fillTitleAndAuthor(title, author) {
	const titleInput = page.getByLabel("Titulo");
	const authorInput = page.getByLabel("Autor");

	await titleInput.fill(title);
	await authorInput.fill(author);
}

async function submitSearchWithResponse() {
	const searchButton = page.getByRole("button", { name: /buscar/i });
	const [response] = await Promise.all([
		page.waitForResponse((resp) => {
			return resp.url().includes("/books/search") && resp.request().method() === "POST";
		}),
		searchButton.click(),
	]);

	lastSearchResponse = response;
}

Before(async function () {
	browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	page = await context.newPage();
});

After(async function () {
	if (browser) {
		await browser.close();
	}
});

Given("I open the application", async function () {
	await page.goto(APP_URL, { waitUntil: "domcontentloaded" });
});

// Scenario: Search from the form
When(
	"I fill the form with title {string} and author {string}",
	async function (title, author) {
		await fillTitleAndAuthor(title, author);
	}
);

When("I submit the search", async function () {
	await submitSearchWithResponse();
});

Then("the search request runs successfully", async function () {
	assert.ok(lastSearchResponse, "Expected a search response to be captured");
	assert.ok(lastSearchResponse.ok(), "Expected search response to be OK");
});

// Scenario: Results visualization
Then("I should see three book cards", async function () {
	const cards = page.locator(".book-card");
	await cards.first().waitFor();
	const count = await cards.count();
	assert.strictEqual(count, 3);
});

// Scenario: Error for required parameters
When("I submit the search without title or author", async function () {
	await fillTitleAndAuthor("", "");
	await page.getByRole("button", { name: /buscar/i }).click();
});

Then("I should see a required parameters error message", async function () {
	const errorText = /por favor, ingresa al menos un criterio de b[uú]squeda/i;
	await page.getByText(errorText).waitFor();
});

// Scenario: Error for insufficient matches
Then("I should see an insufficient results error message", async function () {
	await page.getByText("Error al buscar libros").waitFor();
});

Then("every book should show its information", async function () {
	const cards = page.getByTestId("book-card");
	await cards.first().waitFor();

	const count = await cards.count();
	for (let i = 0; i < count; i += 1) {
		const card = cards.nth(i);

		await card.getByTestId("book-title").waitFor();
		await card.getByTestId("book-author").waitFor();

		const cover = card.getByTestId("book-cover");
		const coverMissing = card.getByTestId("book-cover-missing");
		const coverCount = await cover.count();
		const missingCount = await coverMissing.count();

		assert.ok(
			coverCount + missingCount > 0,
			"Expected a cover image or a missing-cover placeholder"
		);

		if (coverCount > 0) {
			await cover.first().waitFor();
		}
		if (missingCount > 0) {
			await coverMissing.first().waitFor();
		}
	}
});
