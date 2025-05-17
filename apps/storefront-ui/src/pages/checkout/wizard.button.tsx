import styled from 'styled-components';

export const WizardActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: flex-end;
`;

export const WizardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.navBg : theme.colors.primary};
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.primary : '#fff'};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 9px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  &:hover, &:focus {
    background: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.primary : theme.colors.accent};
    color: #fff;
    outline: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: #aaa;
    border-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;