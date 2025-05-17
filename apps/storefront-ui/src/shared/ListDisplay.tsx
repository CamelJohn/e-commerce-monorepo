import { useState } from 'react';
import styled from 'styled-components';

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 18px;
`;

const SearchInput = styled.input`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  max-width: 340px;
  background: ${({ theme }) => theme.colors.navBg};
  color: ${({ theme }) => theme.colors.text};
`;

const SwitchWrapper = styled.label`
  display: flex;
  margin: 0 auto 18px auto;
  gap: 10px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span<{checked: boolean}>`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ theme, checked }) => checked ? theme.colors.primary : theme.colors.border};
  border-radius: 24px;
  transition: background 0.2s;
  display: inline-block;
  &::before {
    content: "";
    position: absolute;
    left: ${({ checked }) => checked ? '22px' : '2px'};
    top: 2px;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.cardBg};
    border-radius: 50%;
    transition: left 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin: 32px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0;
  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 10px 12px;
    text-align: left;
  }
  th {
    background: ${({ theme }) => theme.colors.navBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

type ListDisplayProps<T> = {
  title: string;
  data: T[];
  columns: { key: keyof T; label: string; render?: (item: T) => React.ReactNode }[];
  renderCard: (item: T) => React.ReactNode;
  searchKeys: (keyof T)[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListDisplay<T extends Record<string, any>>({
  title,
  data,
  columns,
  renderCard,
  searchKeys,
}: ListDisplayProps<T>) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const filtered = data.filter((item) =>
    searchKeys.some((key) =>
      String(item[key]).toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div>
      <HeaderRow>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <SearchInput
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </HeaderRow>
      <SwitchWrapper>
        <span style={{color: view === 'cards' ? '#fff' : '#aaa'}}>Cards</span>
        <SwitchInput
          type="checkbox"
          checked={view === 'table'}
          onChange={() => setView(view === 'cards' ? 'table' : 'cards')}
          aria-label="Toggle table/cards view"
        />
        <SwitchSlider checked={view === 'table'} />
        <span style={{color: view === 'table' ? '#fff' : '#aaa'}}>Table</span>
      </SwitchWrapper>
      {view === 'cards' ? (
        <Grid>
          {filtered.map((item) => renderCard(item))}
        </Grid>
      ) : (
        <Table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item.id || idx}>
                {columns.map(col => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(item) : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}