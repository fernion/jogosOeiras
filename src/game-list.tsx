/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import gameDetails from './gameDetails.json'
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

type GameName = {
    type: string,
    sortindex: string;
    value: string;
}

type GameStats = {
    ratings: {
        usersRated: string;
        average: string;
    }
}

type GameDetail = {
    id: string;
    thumbnail: string;
    image: string;
    names: GameName[];
    description: string;
    yearPublished: string;
    minPlayers: string;
    maxPlayers: string;
    playingTime: string;
    minPlayTime: string;
    maxPlayTime: string;
    minAge: string;
    statistics: GameStats;
}

export const GameList = () => {

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const columns = React.useMemo<ColumnDef<GameDetail, any>[]>(
        () => [
            {
                accessorFn: row => row.names[0].value,
                id: 'name',
                cell: info => {
                    const item = info.row.original;
                    return <NameCell game={item}>{info.getValue()}</NameCell>
                },
                header: 'Nome',
            },
            {
                accessorFn: row => row.statistics.ratings.average,
                id: 'rating',
                cell: info => {
                    const rating = info.row.original.statistics.ratings;
                    return <RatingCell users={rating.usersRated} value={rating.average} />
                },
                header: 'Pontuação',
            },
            {
                accessorFn: row => `${row.minPlayers}-${row.maxPlayers}`,
                id: 'players',
                cell: info => info.getValue(),
                header: '# Jogadores',
            },
            {
                accessorFn: row => `${row.minPlayTime}-${row.maxPlayTime}`,
                id: 'duration',
                cell: info => info.getValue(),
                header: 'Duração',
            },
        ],
        []
    )


    const table = useReactTable({
        data: gameDetails as unknown as GameDetail[],
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    return (
        <div className="game-list">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="paginator">
                <div className='paginator-buttons'>
                    <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 24 24"><path d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z" /></svg>
                    </button>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
                    </button>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                    </button>
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 24 24"><path d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z" /></svg>
                    </button>
                </div>
                <div className='paginator-info'>
                    <span className="paginator-counter">
                        <div>Página</div>
                        <input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                        />
                        <strong>
                            de {table.getPageCount()}
                        </strong>
                    </span>
                    <div className="paginator-size">
                        <span>Ver </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = (column.columnDef.meta ?? {}) as any; // TODO: fix this

    return filterVariant === 'range' ? (
        <div>
            <div className="flex space-x-2">
                {/* See faceted column filters example for min max values functionality */}
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : filterVariant === 'select' ? (
        <select
            onChange={e => column.setFilterValue(e.target.value)}
            value={columnFilterValue?.toString()}
        >
            {/* See faceted column filters example for dynamic select options */}
            <option value="">All</option>
            <option value="complicated">complicated</option>
            <option value="relationship">relationship</option>
            <option value="single">single</option>
        </select>
    ) : (
        <DebouncedInput
            onChange={value => column.setFilterValue(value)}
            placeholder={`Procurar...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
        />
        // See faceted column filters example for datalist search suggestions
    )
}

// A typical debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

const RatingCell = ({ users, value }: { users: string, value: string }) => {
    return <div className="rating"><span>{(+value).toFixed(1)}</span><span>({users})</span></div>
}

const NameCell = ({ game, children }: { game: GameDetail, children: string }) => {
    return (
        <div className="game-name">
            <span className='thumbnail'><img src={game.thumbnail} /></span>
            <div>
                <a href={`https://boardgamegeek.com/boardgame/${game.id}`}>{children}</a>
                <span className='game-date'>({game.yearPublished})</span>
            </div>
        </div>
    );
}