import {expect, test} from "@playwright/test";
import {TablePage, LanguageRadioEnum, SortByLabel, LevelCheckboxEnum, CellsDataColEnum} from "../pages/TablePage";

const sortAscCourses = (a: string, b: string) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();
  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
}

test.describe('Practice Table Functionality', () => {
  let tablePage: TablePage;

  // Set up the Page Object before each test
  test.beforeEach(async ({ page }) => {
      tablePage = new TablePage(page);
      await tablePage.goto();
  });

  test('Test case 1: Language filter -> Java', async () => {
    await tablePage.langRadio(LanguageRadioEnum.Java).click();

    await expect(tablePage.langRadio(LanguageRadioEnum.Java)).toBeChecked();
    const texts = (await tablePage.cellsInnerText(CellsDataColEnum.Language)).filter(e => e != LanguageRadioEnum.Java);
    expect(texts.length).toBe(0)
  });

  test('Test case 2: Level filter -> Beginner Only', async () => {
    await tablePage.levelCheckbox(LevelCheckboxEnum.Intermediate).uncheck();
    await tablePage.levelCheckbox(LevelCheckboxEnum.Advanced).uncheck();

    await expect(tablePage.levelCheckbox(LevelCheckboxEnum.Beginner)).toBeChecked();
    const texts = (await tablePage.cellsInnerText(CellsDataColEnum.Level)).filter(e => e != LevelCheckboxEnum.Beginner);

    expect(texts.length).toBe(0)

  });

  test('Test case 3: Min enrollments -> 10_000+', async () => {
    await tablePage.selectEnrollOptionOption("10000");

    const texts = (await tablePage.cellsInnerText(CellsDataColEnum.Enrollments)).filter(e => parseFloat(e) < 10_000);

    expect(texts.length).toBe(0)
  });

  test('Test case 4: Combined filters → Python + Beginner + 10,000+', async () => {
    await tablePage.langRadio(LanguageRadioEnum.Python).click();
    await tablePage.levelCheckbox(LevelCheckboxEnum.Intermediate).uncheck();
    await tablePage.levelCheckbox(LevelCheckboxEnum.Advanced).uncheck();
    await tablePage.selectEnrollOptionOption("10000");

    const textsLang = (await tablePage.cellsInnerText(CellsDataColEnum.Language)).filter(e => e != LanguageRadioEnum.Python);
    expect(textsLang.length).toBe(0);

    const textsLevel = (await tablePage.cellsInnerText(CellsDataColEnum.Level)).filter(e => e != LevelCheckboxEnum.Beginner);
    expect(textsLevel.length).toBe(0);

    const textsEnroll = (await tablePage.cellsInnerText(CellsDataColEnum.Enrollments)).filter(e => parseFloat(e) < 10_000);
    expect(textsEnroll.length).toBe(0);
  });

  test('Test case 5: No results state', async () => {
    await tablePage.langRadio(LanguageRadioEnum.Java).click();
    await tablePage.levelCheckbox(LevelCheckboxEnum.Intermediate).uncheck();
    await tablePage.levelCheckbox(LevelCheckboxEnum.Beginner).uncheck();
    await tablePage.selectEnrollOptionOption("50000");

    await expect(tablePage.noMatchingCourses).toBeVisible();

  });

  test('Test case 6: Reset button visibility and behavior', async () => {
    await tablePage.langRadio(LanguageRadioEnum.Java).click();

    await expect(tablePage.resetButton).toBeVisible();

    await tablePage.resetButton.click();
    // verify button hidden
    await expect(tablePage.resetButton).not.toBeVisible();

    // verify language is 'Any'
    await expect(tablePage.langRadio(LanguageRadioEnum.Any)).toBeChecked()

    // verify all levels is checked
    await expect(tablePage.levelCheckbox(LevelCheckboxEnum.Beginner)).toBeChecked();
    await expect(tablePage.levelCheckbox(LevelCheckboxEnum.Intermediate)).toBeChecked();
    await expect(tablePage.levelCheckbox(LevelCheckboxEnum.Advanced)).toBeChecked();

    // verify enrollments is 'Any'
    await expect(tablePage.enrollDropdown).toHaveAttribute('data-value', 'any');

    
  });

  test('Test case 7: Sort by Enrollments (ascending, numeric)', async () => {
    // sort by Enrollments
    await tablePage.selectSortByOption(SortByLabel.Enrollments);

    // verify visible rows are ordered from smallest to largest enrollment
    const enrollmentsText = await tablePage.cells(CellsDataColEnum.Enrollments).allTextContents();
    const actualEnrollmentNumbers = enrollmentsText.map( text => parseFloat(text));
    const expectedSortedNumbers = [...actualEnrollmentNumbers].sort((a, b) => a - b);
    expect(actualEnrollmentNumbers).toEqual(expectedSortedNumbers);

    // verify numbers with commas sort correctly

  });

  test('Test case 8: Sort by Course Name (alphabetical)', async () => {
    // Set Sort by = Course Name
    await tablePage.selectSortByOption(SortByLabel.CourseName);

    // Verify visible rows are ordered A→Z by course name
    let coursesText = await tablePage.cells(CellsDataColEnum.Course).allTextContents();
    const actualCourseNames = coursesText.map( text => text);
    const expectedCourseNames = [...actualCourseNames].sort(sortAscCourses);

    expect(actualCourseNames).toEqual(expectedCourseNames);

    // Verify order updates after changing filters
    await tablePage.selectSortByOption(SortByLabel.Enrollments);
    coursesText = await tablePage.cells(CellsDataColEnum.Course).allTextContents();
    const actualAssortedCourseNames = coursesText.map( text => text);
    expect(actualAssortedCourseNames).not.toEqual(expectedCourseNames);
  
  });

});