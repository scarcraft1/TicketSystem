import { IsLoggedUserPipe } from './is-logged-user.pipe';

describe('IsLoggedUserPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLoggedUserPipe();
    expect(pipe).toBeTruthy();
  });
});
