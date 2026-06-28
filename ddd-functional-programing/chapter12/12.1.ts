// 도메인 로직과 입출력이 혼합된 작업 흐름
const payInvoice = (invoiceId: InvoiceId) => async (payment: Payment);

Promise<InvoicePaidEvent | null> => {
  // 데이터베이스에서 읽어 들임
  const invoice = await loadInvoiceFromDatabase(invoiceId);

  // 지불 적용
  await payInvoice.applyPayment(payment);

  // 결과 처리
  if (invoice.IsFullyPaid) {
    await markAsFullyPaidInDb(invoiceId);

    return postInvoicePaidEvent(invoiceId);
  } else {
    await markAsPartiallyPaidInDb(invoiceId);

    return null;
  }
}


type InvoicePaymentResult =
  | "FullyPaid"
  | PartiallyPaid;

// 도메인 작업 흐름: 순수 함수
const applyPayment = (payment: Payment) => (unpaidInvoice: UnpaidInvoice):
  InvoicePaymentResult => {
  // 지불 적용
  const updatedInvoice = unpaidInvoice.applyPayment(payment);

  // 결과 처리
  return isFullyPaid(updatedInvoice)
    ? "FullyPaid"
    : PartiallyPaid(updatedInvoice);
}

class PayInvoiceCommand {
  ...
  readonly invoiceId: ...
  readonly payment: ...
  ...
}

// 바운디드 컨텍스트 가장자리의 명령 처리기
const payInvoice = async ({ invoiceId, payment }: PayInvoiceCommand) => {
  // 데이터베이스에서 읽어 들임
  const unpaidInvoice = await loadInvoiceFromDatabase(invoiceId); // 입출력

  // 순수 도메인 호출
  const paymentResult = pipe(unpaidInvoice, applyPayment(payment)) // 순수

  // 결과 처리
  switch (paymentResult) {
    case "FullyPaid":
      await markAsFullyPaidInDb(invoiceId); // 입출력
      await postInvoicePaidEvent(invoiceId); // 입출력

    default:
      await updateInvoiceInDb(paymentResult.updatedInvoice); // 입출력
  }
}

// 바운디드 컨텍스트 가장자리에서의 명령 핸들러
const payInvoice = (
  loadUnpaidInvoiceFromDatabase: loadUnpaidInvoiceFromDatabase,
  markAsFullyPaidDb: MarkAsFullyPaidInDb,
  updateInvoiceInDb: UpdateInvoiceInDb,
) => async ({ invoiceId, payment }: PayInvoiceCommand) => {
  // 데이터베이스에서 읽어 들임
  const unpaidInvoice = await loadUnpaidInvoiceFromDatabase(invoiceId); // 입출력

  // 순수 도메인 호출
  const paymentResult = pipe(unpaidInvoice, applyPayment(payment)) // 순수

  // 결과 처리
  switch (paymentResult) {
    case "FullyPaid":
      await markAsFullyPaidDb(invoiceId); // 입출력
      await postInvoicePaidEvent(invoiceId); // 입출력
    default:
      await updateInvoiceInDb(paymentResult.updatedInvoice); // 입출력
  }
}