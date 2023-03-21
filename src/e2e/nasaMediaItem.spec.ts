import { test, expect } from "@playwright/test";
import { makeTestUrl } from "./utils";
import { EXPLORE_URL, makeNasaMediaUrl } from "constants/urls";
import { NASA_MEDIA_LIBRARY_API_ROOT } from "constants/nasaMediaLibrary";
import { NASA_API_SEARCH_MOCK_DATA } from "./data/nasa";
import { getDateString } from "utils/date";

test.describe("nasaMediaItem", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(NASA_MEDIA_LIBRARY_API_ROOT, async (route) => {
      const json = NASA_API_SEARCH_MOCK_DATA;
      await route.fulfill({ json });
    });
  });

  test("main page redirects to /explore", async ({ page }) => {
    const {
      nasa_id,
      title,
      date_created,
      photographer,
      description,
      keywords,
    } = NASA_API_SEARCH_MOCK_DATA.collection.items[0].data[0];

    await page.goto(makeTestUrl(makeNasaMediaUrl(nasa_id)));

    await page.locator(`p >> text=${title}`).first().waitFor();
    await page
      .locator(`p >> text=${getDateString(new Date(date_created))}`)
      .waitFor();
    await page.locator(`p >> text=${photographer}`).first().waitFor();
    await page.locator(`p >> text=${description}`).first().waitFor();

    await Promise.all(
      keywords.map(async (keyword) => {
        await page.locator(`li >> text=${keyword}`).first().waitFor();
      })
    );
  });

  test("clicking the back arrow on an item leads to the list", async ({
    page,
  }) => {
    const { nasa_id } = NASA_API_SEARCH_MOCK_DATA.collection.items[0].data[0];

    await page.goto(makeTestUrl(makeNasaMediaUrl(nasa_id)));

    await page
      .locator(`[class*=item__BackButtonDiv] >> button`)
      .first()
      .click();

    await expect(page).toHaveURL(makeTestUrl(EXPLORE_URL));
  });
});
