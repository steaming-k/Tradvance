// QA 재현 테스트용 샘플 3종 (MOQ / 납기 / 인증 중심) — requirements.md 10장 기준
export const SAMPLE_INQUIRIES = [
  {
    id: "moq",
    label: "샘플 1 · MOQ 중심",
    text:
      "Subject: Quotation Request – Hydraulic Couplings\n\nHi, we're interested in your hydraulic coupling series for a project in Hamburg. Could you send a quotation for 500 units? Also, what is your minimum order quantity, and what would the lead time be if we ordered today? Please also confirm if you can provide test certificates with the shipment.",
  },
  {
    id: "leadtime",
    label: "샘플 2 · 납기 중심",
    text:
      "Subject: Urgent – Delivery Timeline for Pump Parts\n\nWe received your pump parts offer last week and are ready to proceed, but our project deadline is tight. Can you guarantee delivery within 4 weeks from order confirmation? Please also confirm unit price at 300pcs and whether ISO 9001 certification applies to this product line.",
  },
  {
    id: "certification",
    label: "샘플 3 · 인증/품질 중심",
    text:
      "Subject: Certification & Sample Request – Industrial Bearings\n\nBefore placing a bulk order, we need to confirm CE and ISO certification for your bearing series, and would like to request 5 sample units for internal testing. Could you also share your standard payment terms (T/T or L/C) and estimated production capacity per month?",
  },
] as const;
