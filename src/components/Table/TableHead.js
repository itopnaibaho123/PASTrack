import React from "react";

export default function TableHead({ cols, studentScore }) {
	return (
		<thead>
			<tr>
				<td className="py-3 border border-gray/50 px-4 relative z-10 font-bold">No</td>	
				{cols.map((col, index) => (
					<td key={col} className="py-3 border border-gray/50 px-4 relative z-10 font-bold">
						{col}
					</td>
				))}
				
                <td className="py-3 border border-gray/50 px-4 relative z-10 font-bold">Action</td>
				
			</tr>
			<tr className="border-b border-gray/50">
				<td colSpan="100%"></td>
			</tr>
		</thead>
	);
}
