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

function EmployeesPage() {
  const data = useSelector((state) => state.user.users)

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

  const pageSizeOptions = [
    { value: 10, label: 'Show 10' },
    { value: 20, label: 'Show 20' },
    { value: 30, label: 'Show 30' },
    { value: 40, label: 'Show 40' },
    { value: 50, label: 'Show 50' },
  ]

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
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const firstRowOnPage = pageIndex * pageSize + 1
  const lastRowOnPage = firstRowOnPage + page.length - 1
  const totalRows = data.length

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
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
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
            <Select
              className='PageSizeSelect'
              value={pageSizeOptions.find(
                (option) => option.value === pageSize
              )}
              onChange={handlePageSizeChange}
              options={pageSizeOptions}
              isClearable={false}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeesPage
