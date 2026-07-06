import { BackofficeShell } from "@/components/backoffice/BackofficeShell";
import { InquiryCard } from "@/components/backoffice/InquiryCard";
import { MOCK_INQUIRIES, STATUS_COLUMNS } from "@/lib/mockInquiries";

export default function BoardPage() {
  return (
    <BackofficeShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-xl font-semibold text-gray-900">문의 보드</h1>
          <p className="mt-1 text-sm text-gray-500">처리 상태별로 바이어 문의를 훑어보세요</p>
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map((column) => {
            const items = MOCK_INQUIRIES.filter((inquiry) => inquiry.status === column.id);
            return (
              <div key={column.id} className="w-64 shrink-0">
                <div className="flex items-center gap-2 px-1">
                  <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                  <h2 className="text-sm font-medium text-gray-800">{column.label}</h2>
                  <span className="rounded-full bg-gray-100 px-2 text-sm text-gray-500">
                    {items.length}
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  {items.map((inquiry) => (
                    <InquiryCard key={inquiry.id} inquiry={inquiry} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BackofficeShell>
  );
}
