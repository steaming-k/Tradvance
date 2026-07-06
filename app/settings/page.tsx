import { BackofficeShell } from "@/components/backoffice/BackofficeShell";
import { ForwardingAddressCard } from "@/components/backoffice/ForwardingAddressCard";
import { FilterSetupSteps } from "@/components/backoffice/FilterSetupSteps";
import { InfoIcon } from "@/components/icons";

export default function SettingsPage() {
  return (
    <BackofficeShell>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-xl font-semibold text-gray-900">
          Gmail 문의를 Tradvance로 전달하는 방법
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Gmail에서 특정 바이어 문의 메일을 Tradvance 주소로 전달하면, 문의 분석과 답변 초안
          생성을 시작할 수 있습니다.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FilterSetupSteps />

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(98_80_237/77%)] text-sm font-semibold text-white">
                3
              </span>
              <h2 className="text-base font-medium text-gray-800">전달 주소 붙여넣기</h2>
            </div>
            <div className="mt-3">
              <ForwardingAddressCard />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
          <InfoIcon className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
          이 단계는 자동 연동이 아니라 사용자가 직접 설정하는 포워딩 가이드입니다. (Gmail
          계정을 연결하는 OAuth 방식이 아닙니다.)
        </div>
      </div>
    </BackofficeShell>
  );
}
