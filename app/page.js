"use client";
import { useSession } from "next-auth/react";
import LoginGate from "@/components/LoginGate";
import Tracker from "@/components/Tracker";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return <div className="splash"><div className="spinner big" /></div>;
  if (!session) return <LoginGate />;
  return <Tracker user={session.user} />;
}
