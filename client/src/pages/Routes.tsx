import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { useTable, useSortBy, usePagination } from "react-table";

interface Route {
  id: string;
  "sol #": string;
  "city, state": string;
  zip: string;
  type: string;
  duration: string;
  pay_rate?: string;
}

export default function Routes() {
  const [routesData, setRoutesData] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestCsv = async () => {
      try {
        let csvUrl;
        if (window.location.hostname.includes('github.io')) {
          csvUrl = '/data/routes.csv';
        } else {
          const latestCsvResponse = await fetch('/api/latest-csv');
          const apiData = await latestCsvResponse.json();
          csvUrl = `/data/${apiData.latestFile}`;
        }
        const csvResponse = await fetch(csvUrl);
        const csvText = await csvResponse.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            setRoutesData(results.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };
    fetchLatestCsv();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Route ID", accessor: "id" },
      { Header: "Solicitation #", accessor: "sol #" },
      { Header: "City, State", accessor: "city, state" },
      { Header: "ZIP Code", accessor: "zip" },
      { Header: "Type", accessor: "type" },
      { Header: "Duration", accessor: "duration" },
      { Header: "Pay Rate", accessor: "pay_rate" },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }: any) => (
          <div className="space-x-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => alert(`Apply for route ${row.original.id}`)}
            >
              Apply
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: routesData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  if (loading) return <div className="text-center py-8">Loading routes...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Current Route Status</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Latest update: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                  >
                    {column.render("Header")}
                    <span className="ml-2">
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50">
        <div className="flex space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            « First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            ‹ Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next ›
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Last »
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm text-gray-700"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
