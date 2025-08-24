'use client';

interface TableColumn {
  key: string;
  label: string;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: TableColumn[];
  data: any[];
  mobileTitle?: string;
  headerClassName?: string;
  rowClassName?: string;
  mobileRender?: (row: any, index: number) => React.ReactNode;
}

export default function ResponsiveTable({
  columns,
  data,
  mobileTitle = "Información",
  headerClassName = "bg-blue-200",
  rowClassName = "bg-blue-50",
  mobileRender
}: ResponsiveTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto p-4">
        <table className="w-full text-center text-black border-collapse">
          <thead className="font-semibold">
            <tr className={headerClassName}>
              {columns.map((column) => (
                <th key={column.key} className={`p-3 border ${column.className || ''}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className={`${index % 2 === 0 ? rowClassName : 'bg-white'} hover:bg-blue-100 transition-colors`}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`p-3 border ${column.className || ''}`}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden p-4">
        <table className="w-full text-center text-black border-collapse">
          <thead className="font-semibold">
            <tr className={headerClassName}>
              <th className="p-3 border">{mobileTitle}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className={`${index % 2 === 0 ? rowClassName : 'bg-white'} hover:bg-blue-100 transition-colors`}
              >
                <td className="p-4 border">
                  {mobileRender ? mobileRender(row, index) : (
                    <div className="flex flex-col text-left">
                      {columns.map((column) => (
                        <p key={column.key}>
                          <span className="text-sm text-gray-600">{column.label}:&nbsp;</span>
                          <span className="font-medium">
                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
} 