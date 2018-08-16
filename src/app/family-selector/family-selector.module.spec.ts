import { FamilySelectorModule } from './family-selector.module';

describe('FamilySelectorModule', () => {
  let familySelectorModule: FamilySelectorModule;

  beforeEach(() => {
    familySelectorModule = new FamilySelectorModule();
  });

  it('should create an instance', () => {
    expect(familySelectorModule).toBeTruthy();
  });
});
