import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without errors', () => {
  render(<App />);

  const navHeader = screen.getByText(/^Navigation$/i);
  expect(navHeader).toBeInTheDocument();

  const viewerContainer = screen.getByText(/^Navigation에서 .+[을를] 선택해보세요!$/i);
  expect(viewerContainer).toBeInTheDocument();
});
