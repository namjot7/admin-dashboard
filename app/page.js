"use client"
import Layout from "@/app/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // if(!session) return; // does not work
  // console.log(session);

  return (
    <Layout>
      <div className="">
        {/* picture + name */}
        {/* <div className="absolute top-6 right-24 flex-center btn-primary py-2">
          <img className="w-6 rounded-full" src={session?.user?.image} alt="profile picture" />
          <span>{session?.user?.name}</span>
        </div> */}

        {/* picture only */}
        <div className="absolute top-2 right-28 flex-center py-2">
          <img className="w-10 rounded-full" src={session?.user?.image} alt="profile picture" />
        </div>
        <div>
          <h1>Dashboard</h1>
          <span>Hello, {session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )

}
