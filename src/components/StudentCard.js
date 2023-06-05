// import { useRouter } from 'next/router'
// import React from 'react'
// import Button from './Button'
// import { B } from './Typography'

// export default function StudentCard({
//   nama,
//   username,
//   peminatan = false
// }) {
//   const router = useRouter()
//   return (
//     <div className="w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4">
//       <h1 className="text-center text-white font-bold text-xl">{nama}</h1>
//       {peminatan === false && <Button variant="natural" onClick={() => router.push(`${router.asPath}/siswa/${username}`)}>Lihat Nilai</Button>}
//     </div>
//   )
// }
import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'
import { B } from './Typography'

export default function StudentCard({
  nama,
  username,
  peminatan = false
}) {
  const router = useRouter()
  return (
    <div className="w-1/2 p-8 mb-1 bg-blue-800 rounded-2xl shadow-lg border-4 border-yellow-400 my-1 py-4 flex flex-row items-center justify-between">
      <h1 className="text-center text-white font-bold text-xl">{nama}</h1>
      {peminatan === false && (
        <Button
          variant="natural"
          onClick={() => router.push(`${router.asPath}/siswa/${username}`)}
        >
          Lihat Nilai
        </Button>
      )}
    </div>
  )
}
