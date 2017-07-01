import { MyBeersPage } from './app.po';

describe('my-beers App', () => {
  let page: MyBeersPage;

  beforeEach(() => {
    page = new MyBeersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
