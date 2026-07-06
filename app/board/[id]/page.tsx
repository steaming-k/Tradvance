import { notFound } from "next/navigation";
import { BackofficeShell } from "@/components/backoffice/BackofficeShell";
import { BoardCardDetail } from "@/components/backoffice/BoardCardDetail";
import { analyzeInquiry } from "@/lib/analyzeInquiry";
import { getMockInquiry } from "@/lib/mockInquiries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoardCardPage({ params }: Props) {
  const { id } = await params;
  const inquiry = getMockInquiry(id);
  if (!inquiry) notFound();

  const analysis = analyzeInquiry(inquiry.originalText);
  if (!analysis.recognized) notFound();

  return (
    <BackofficeShell>
      <BoardCardDetail inquiry={inquiry} analysis={analysis} />
    </BackofficeShell>
  );
}
