"use client"
import Layout from "@/app/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // if(!session) return; // does not work
  // console.log(session);

  return (
    <Layout>

      <div className="flex justify-between items-center">
        <div>Hello, {session?.user?.name}</div>

        <div className="flex gap-2 items-center bg-primary px-2 py-1 rounded-lg">
          <img className="w-6 rounded-full" src={session?.user?.image} alt="profile picture" />
          <span>{session?.user?.name}</span>
        </div>
      </div>

    </Layout>
  )

}
