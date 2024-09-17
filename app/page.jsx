'use client'

import { Button } from "@mui/joy";
import { useRouter } from "next/navigation";

const DefPage = () => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/organizer")}>Login as Organizer</Button>
      <Button onClick={() => router.push("/user")}>Login as User</Button>
    </>
  )
};

export default DefPage