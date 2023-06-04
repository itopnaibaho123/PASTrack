import React from "react";
import Link from "next/link";

export default function Breadcrumb({ links, active }) {
	return (
		<div className="px-4 py-4">
			{links.map((link, index) => {
				return (
					<span key={index}>
						<Link href={link.href}>
							<span
								className={`${
									active === link.label && "text-transparent bg-clip-text bg-gradient-to-r from-lightblue to-main-color-navy"
								} hover:text-transparent hover:bg-clip-text bg-gradient-to-r hover:from-lightblue hover:to-main-color-navy`}
							>
								{link.label}
							</span>
						</Link>
						<span className="px-2">{links.indexOf(link) != links.length - 1 && "/"}</span>
					</span>
				);
			})}
		</div>
	);
}