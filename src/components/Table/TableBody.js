import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";
import Input from "../Input";
export default function TableBody({
  data,
  cols,
  komponen,
  profile,
  studentScore,
  editMode,
}) {
  const router = useRouter();
  console.log(data);
  if (studentScore) {
    return (
      <tbody>
        {data.map((item, index) => {
          return (
            Object.entries(item).length > 1 && (
              <tr key={index}>
                <td
                  className={`py-3  border border-gray/50 px-4 relative z-10`}
                >
                  {index + 1}
                </td>
                {cols.map((col, index) => (
                  <td
                    key={col}
                    className={`py-3  border border-gray/50 px-4 relative z-10 ${
                      index === 0 && "font-bold"
                    }`}
                  >
                    {col === "kalkulasiBobotNilai" &&
                      (item["bobotPenilaian"] * item["nilai"]) / 100}
                    {item[col]}
                  </td>
                ))}
                <td className="py-3  border border-gray/50 px-4 relative z-10">
                  <Button onClick={() => router.push(`${router.asPath}/${item.id}`)}>Edit</Button>
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    );
  } else {
    return (
      <tbody>
        {data.map((item, index) => {
          return (
            Object.entries(item).length > 1 && (
              <tr key={index}>
                <td
                  className={`py-3  border border-gray/50 px-4 relative z-10`}
                >
                  {index + 1}
                </td>
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
                  {profile && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`/profile/${item["username"]}`)
                        }
                      >
                        Detail
                      </Button>
                      <Button
                        onClick={() =>
                          router.push(
                            `/profile/${item["username"]}/EditProfile`
                          )
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                  {komponen && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`${router.asPath}/${item.id}`)
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    );
  }
}
