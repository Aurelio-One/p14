import React, { useMemo, useState } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
} from 'react-table'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import './EmployeesPage.css'

/**
 * Custom filter function to filter table rows by first and last name.
 * @param {Array} rows - The rows of the table.
 * @param {string} id - The id of the column being filtered.
 * @param {string} filterValue - The value to filter by.
 * @returns {Array} Filtered rows.
 */
function filterOnlyNameAndLastName(rows, id, filterValue) {
  return rows.filter((row) => {
    const firstName = row.values.firstname || ''
    const lastName = row.values.lastname || ''
    const searchStr = filterValue.toLowerCase()
    return (
      firstName.toLowerCase().includes(searchStr) ||
      lastName.toLowerCase().includes(searchStr)
    )
  })
}

/**
 * Component for global filtering of table data.
 * @param {string} globalFilter - The current global filter value.
 * @param {Function} setGlobalFilter - Function to set the global filter value.
 */
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder='Search...'
    />
  )
}

/**
 * Component to display a paginated, sortable, and filterable table of employees.
 */
function EmployeesPage() {
  const data = useSelector((state) => state.user.users)

  // Define columns for react-table
  const columns = useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstname' },
      { Header: 'Last Name', accessor: 'lastname' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'code' },
    ],
    []
  )

  // Define page size options
  const pageSizeOptions = [
    { value: 10, label: 'Show 10' },
    { value: 20, label: 'Show 20' },
    { value: 30, label: 'Show 30' },
    { value: 40, label: 'Show 40' },
    { value: 50, label: 'Show 50' },
  ]

  // Hooks and methods from react-table for table handling
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      globalFilter: filterOnlyNameAndLastName,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  // Calculate row information for display
  const firstRowOnPage = pageIndex * pageSize + 1
  const lastRowOnPage = firstRowOnPage + page.length - 1
  const totalRows = data.length

  /**
   * Handles changes in page size.
   * @param {Object} selectedOption - The selected page size option.
   */
  const handlePageSizeChange = (selectedOption) => {
    setPageSize(selectedOption.value)
  }

  return (
    <div className='container'>
      <div className='EmployeesPage'>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <table
          {...getTableProps()}
          className='Table'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='TableHeader'
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className='TableHeaderCell'
                  >
                    {column.render('Header')}
                    <span className='SortIcon'>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ↓'
                          : ' ↑'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className='TableBody'
          >
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  className='TableRow'
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='TableCell'
                        data-label={cell.column.Header}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='Pagination'>
          <span className='PaginationRange'>
            Showing {firstRowOnPage} to {lastRowOnPage} of {totalRows} entries
          </span>
          <div className='PaginationControls'>
            <div>
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {'<<'}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {'<'}
              </button>{' '}
            </div>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <div>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {'>'}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {'>>'}
              </button>
            </div>
          </div>{' '}
          <Select
            className='PageSizeSelect'
            value={pageSizeOptions.find((option) => option.value === pageSize)}
            onChange={handlePageSizeChange}
            options={pageSizeOptions}
            isClearable={false}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default EmployeesPage
