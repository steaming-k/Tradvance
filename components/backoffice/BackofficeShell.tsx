import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { NoticeBar } from "@/components/NoticeBar";

interface Props {
  children: ReactNode;
}

export function BackofficeShell({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <NoticeBar />
        {children}
      </div>
    </div>
  );
}
