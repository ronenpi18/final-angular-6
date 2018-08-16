import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
  let dashboardModule: DashboardModule;

  beforeEach(() => {
    try {
      dashboardModule = new DashboardModule();
    } catch(e) {
      console.log(e);
    }
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
