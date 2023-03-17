import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'
import { B } from './Typography'

export default function StudentCard({
  nama,
  username
}) {
    const router = useRouter()
  return (
    <div className='bg-orange-200 py-4 px-4 flex gap-4 min-w-[300px] ring-2 ring-orange-400 justify-between'>
        <B>{nama}</B>
        <Button onClick={() => router.push(`${router.asPath}/siswa/${username}`)}>Lihat Nilai</Button>
    </div>
  )
}
