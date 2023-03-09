import { useRouter } from "next/router"



export default  function kelasan () {




    const router = useRouter();
    const { id } = router.query;

    console.log(id)

    return <>
        <div>
            this is {id}
        </div>
    </>
} 
