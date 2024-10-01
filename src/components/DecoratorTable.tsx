
import React from 'react'

export default function DecoratorTable({ children }) {

	return (
		<div className='w-full md:overflow-visible overflow-x-scroll py-1'>
			<table className="blog-table md:table-auto min-w-full  w-full mb-10  ">
				{children && children.rows[0].cells[0] && children.rows[0].cells[1]  !== "" && <thead className=''>
					<tr className=''>
						{
							children && children.rows[0].cells.map((cellItem, index) => {
								return <th className='text-left px-4 py-3 font-semibold first:rounded-tl-md bg-cs-black last:rounded-tr-md text-white ' key={index}>{cellItem}</th>
							})
						}
					</tr>
				</thead>}

				<tbody className='overflow-x-scroll'>
					{
						children && children.rows.map((rowItem, index) => {
							return index !== 0 && <tr className='even:bg-gray-100 last:border-b border-cs-gray-900 hover:bg-teal-100' key={index}>
								{
									rowItem.cells.map((cellItem, index) => {
										return <td className='text-left px-4 py-3 ' key={index} dangerouslySetInnerHTML={{ __html: cellItem }}></td>
									})
								}
							</tr>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
