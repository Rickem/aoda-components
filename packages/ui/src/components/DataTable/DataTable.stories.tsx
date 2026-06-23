import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import type { DataTableColumn } from './DataTable';

const columns: DataTableColumn[] = [
  { key: 'date', header: 'Date', sortable: true },
  { key: 'description', header: 'Description' },
  { key: 'amount', header: 'Amount', sortable: true },
  { key: 'balance', header: 'Balance' },
];

const data = [
  { date: '2026-06-20', description: 'Direct Deposit — Payroll', amount: '+$3,250.00', balance: '$8,450.00' },
  { date: '2026-06-19', description: 'Hydro One — Utilities', amount: '-$142.50', balance: '$5,200.00' },
  { date: '2026-06-18', description: 'Interac e-Transfer — J. Smith', amount: '-$200.00', balance: '$5,342.50' },
  { date: '2026-06-17', description: 'CIBC Mortgage Payment', amount: '-$1,850.00', balance: '$5,542.50' },
  { date: '2026-06-15', description: 'Shopify Inc — Refund', amount: '+$45.99', balance: '$7,392.50' },
];

const meta: Meta<typeof DataTable> = {
  title: 'AODA/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'Accessible data table with sortable columns, aria-sort indicators, and proper th scope. Satisfies WCAG 1.3.1 (th scope="col", caption), 1.4.3 (text contrast), 2.1.1 (sort buttons keyboard operable), 2.4.7 (focus visible on sort buttons), 4.1.2 (aria-sort on sortable headers).',
      },
    },
  },
  argTypes: {
    caption: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    columns,
    data,
    caption: 'Recent transactions',
  },
};

export const Sortable: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string | undefined>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [sortedData, setSortedData] = useState(data);

    function handleSort(key: string, direction: 'asc' | 'desc') {
      setSortKey(key);
      setSortDirection(direction);
      const sorted = [...data].sort((a, b) => {
        const aVal = a[key as keyof typeof a];
        const bVal = b[key as keyof typeof b];
        if (direction === 'asc') return aVal < bVal ? -1 : 1;
        return aVal > bVal ? -1 : 1;
      });
      setSortedData(sorted);
    }

    return (
      <DataTable
        columns={columns}
        data={sortedData}
        caption="Recent transactions (sortable)"
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    );
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    caption: 'No transactions found',
  },
};
