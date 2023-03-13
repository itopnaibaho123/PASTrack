import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";

export default function TableBody({ data, cols }) {
  const router = useRouter();
 

  return (
    <tbody>
      {data.map((item, index) => {
        return (
          Object.entries(item).length > 1 && (
            <tr key={index}>
              {cols.map((col, index) => (
                <td
                  key={col}
                  className={`py-3  border border-gray/50 px-4 relative z-10 ${
                    index === 0 && "font-bold"
                  }`}
                >
                  {item[col]}
                </td>
              ))}
              <td
                className={`py-3  border border-gray/50 px-4 relative z-10 ${
                  index === 0 && "font-bold"
                }`}
              >
                <div className="flex px-1">
                  <Button onClick={() => router.push(`/profile/${item['username']}`)}>Detail</Button>
                  <Button onClick={() => router.push(`/profile/${item['username']}/EditProfile`)}>Edit</Button>
                </div>
              </td>
            </tr>
          )
        );
      })}
    </tbody>
  );
}
