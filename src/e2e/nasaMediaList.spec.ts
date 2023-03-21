import { test, expect } from "@playwright/test";
import { makeTestUrl } from "./utils";
import { EXPLORE_URL, HOME_URL, makeNasaMediaUrl } from "constants/urls";
import { NASA_MEDIA_LIBRARY_API_ROOT } from "constants/nasaMediaLibrary";
import { NASA_API_SEARCH_MOCK_DATA } from "./data/nasa";

test.describe("nasaMediaList", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      `${NASA_MEDIA_LIBRARY_API_ROOT}/search?media_type=image&q=`,
      async (route) => {
        const json = NASA_API_SEARCH_MOCK_DATA;
        await route.fulfill({ json });
      }
    );
  });

  test("main page redirects to /explore", async ({ page }) => {
    await page.goto(makeTestUrl(HOME_URL));

    await expect(page).toHaveURL(makeTestUrl(EXPLORE_URL));
  });

  test("explore page renders lists correctly", async ({ page }) => {
    await page.goto(makeTestUrl(EXPLORE_URL));

    // wait for any fade-in effects on the list items
    await page
      .locator("[class*=nasaMediaListItem__NasaMediaItemLi]")
      .first()
      .waitFor();

    const nasaItemCount = await page
      .locator("[class*=nasaMediaListItem__NasaMediaItemLi]")
      .count();

    expect(nasaItemCount).toEqual(
      NASA_API_SEARCH_MOCK_DATA.collection.items.length
    );

    await Promise.all(
      NASA_API_SEARCH_MOCK_DATA.collection.items.map(async (item) => {
        await page
          .locator(`p >> text=${item.data?.[0].title}`)
          .first()
          .waitFor();

        const titleLocatorCount = await page
          .locator(`p >> text=${item.data?.[0].title}`)
          .count();
        expect(titleLocatorCount).toBeGreaterThan(0);

        const photographerLocatorCount = await page
          .locator(`p >> text=${item.data?.[0].photographer}`)
          .count();
        expect(photographerLocatorCount).toBeGreaterThan(0);

        const locationLocatorCount = await page
          .locator(`p >> text=${item.data?.[0].center}`)
          .count();
        expect(locationLocatorCount).toBeGreaterThan(0);
      })
    );
  });

  test("clicking on item leads to item page", async ({ page }) => {
    await page.goto(makeTestUrl(EXPLORE_URL));

    await page
      .locator("[class*=nasaMediaListItem__NasaMediaItemLi]")
      .first()
      .click();

    await expect(page).toHaveURL(
      makeTestUrl(
        makeNasaMediaUrl(
          NASA_API_SEARCH_MOCK_DATA.collection.items[0].data[0].nasa_id
        )
      )
    );
  });
});
