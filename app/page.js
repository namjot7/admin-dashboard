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
        <div>Hello, {session?.user?.name}</div>

        <div className="absolute top-4 right-32 flex-center btn-primary py-2">
          <img className="w-6 rounded-full" src={session?.user?.image} alt="profile picture" />
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )

}
