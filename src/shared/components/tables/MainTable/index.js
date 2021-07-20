// Dependencies
import React, { useCallback, useMemo } from 'react';
import { useTable } from 'react-table';

// Styled Components
import {
  Layout,
  Header,
  Title,
  Icon,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Value,

  EmptyMessage
} from './styles';

function MainTable({
  title = null,
  icon = null,
  emptyMessage = '',
  data,
  columns
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  const renderCell = useCallback(({ value }) => {
    return (
    	<Value>
				{value}
			</Value>
    );
  }, []);

  const renderTableContainer = useMemo(() => (
		<Table {...getTableProps()}>
			<TableHead>
				{headerGroups.map((headerGroup, index) => (
					<TableRow key={`--thead-tr-${index.toString()}`} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, columnIndex) => (
							<TableCell
								key={`--thead-tr-th-${columnIndex.toString()}`}
								type={'head'}
								cellSpacing="0"
								cellPadding="0"
								{...column.getHeaderProps()}
							>
								{column.render('Header')}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody {...getTableBodyProps()}>
				{rows.map((row, index) => {
				  prepareRow(row);
				  return (
						<TableRow key={`--tbody-tr-${index.toString()}`} {...row.getRowProps()}>
							{row.cells.map(cell => {
							  return (
									<TableCell
										type={'body'}
										key={`--tbody-td-${index.toString()}`}
										cellSpacing="0"
										cellPadding="0"
										{...cell.getCellProps()}
									>
										{renderCell(cell)}
									</TableCell>
							  );
							})}
						</TableRow>
				  );
				})}
			</TableBody>
		</Table>
  ), [headerGroups, rows]);

  const renderEmptyMessage = useMemo(() => (
		<EmptyMessage>
			{emptyMessage}
		</EmptyMessage>
  ), [emptyMessage]);

  return (
  	<Layout>
			{title && (
				<Header>
					{icon ? typeof icon === 'string' ? <Icon src={icon} /> : icon : null}
					<Title withIcon={!!icon}>{title}</Title>
				</Header>
			)}
			{rows.length > 0 ? renderTableContainer : renderEmptyMessage}
		</Layout>
  );
}

export default MainTable;
