import { TouristRestuarantPage } from './app.po';

describe('tourist-restuarant App', () => {
  let page: TouristRestuarantPage;

  beforeEach(() => {
    page = new TouristRestuarantPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
