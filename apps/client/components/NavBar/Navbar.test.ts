import { render, screen } from '@testing-library/vue';
import NavBar from '../NavBar/NavBar.vue';

describe('vue test', () => {
  it('should render', async () => {
    render(NavBar);
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
  });
});
