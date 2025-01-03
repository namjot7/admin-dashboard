"use client"
import Layout from "@/app/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // if(!session) return; // does not work
  // console.log(session);

  return (
    <Layout>
      <div>
        {/* Profile div */}
        <div className="absolute top-6 right-24 flex-center btn-primary py-2">
          <img className="w-6 rounded-full" src={session?.user?.image} alt="profile picture" />
          <span>{session?.user?.name}</span>
        </div>
        <div className="absolute top-4 right-6 flex-center py-2">
          <img className="w-10 rounded-full" src={session?.user?.image} alt="profile picture" />
        </div>

        <div>Hello, {session?.user?.name}</div>
      </div>
    </Layout>
  )

}
