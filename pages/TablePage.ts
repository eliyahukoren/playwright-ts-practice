// pages/TablePage.ts

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export const SortByLabel = {
  ID: "ID",
  CourseName: "Course Name",
  Language: "Language",
  Level: "Level",
  Enrollments: "Enrollments"
}

export type AllowedSortByLabel = typeof SortByLabel[keyof typeof SortByLabel]; 

export enum LanguageRadioEnum {
  Any = "Any",
  Java = "Java",
  Python = "Python"
}

export enum LevelCheckboxEnum {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export enum CellsDataColEnum {
  Id = "id",
  Course = "course",
  Language = "language",
  Level = "level",
  Enrollments = "enrollments",
  Link = "link"
}

export class TablePage extends BasePage {
  readonly enrollDropdown;
  readonly noMatchingCourses;
  readonly resetButton;
  readonly sortByDropdown;

  constructor(page: Page) {
    super('practice-test-table', page);
    this.enrollDropdown = page.locator('#enrollDropdown');
    this.noMatchingCourses = page.locator('#noData');
    this.resetButton = page.locator('#resetFilters');
    this.sortByDropdown = page.locator('#sortBy');
  }

  langRadio(langValue: string){
    return this.page.locator(`input[type='radio'][name='lang'][value='${langValue}']`);
  }

  levelCheckbox(levelValue: string){
    return this.page.locator(`input[type='checkbox'][name='level'][value='${levelValue}']`);
  }

  enrollOption(enrollValue: string){
    return this.page.locator(`li[data-value="${enrollValue}"]`);
  }

  cells(text: string, visible: boolean = true){
    const selector = `//td[@data-col='${text}' ${visible ? `and not(contains(../@style, 'display: none'))` : ``}]`
    return this.page.locator(selector)
  }

  async cellsInnerText(text: string, visible: boolean = true){
    return await this.cells(text, visible).allTextContents()
  }

  async selectSortByOption(label: AllowedSortByLabel){
    await this.sortByDropdown.selectOption({label});
  }

  async selectEnrollOptionOption(option: string){
    await this.enrollDropdown.click();
    await this.enrollOption(option).click();
  }
}