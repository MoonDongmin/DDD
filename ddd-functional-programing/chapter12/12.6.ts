const tx = <A>(pool: Pool, task: (c: PoolClient) => Promise<A>): TE.TaskEither<Error, A> =>
  async () => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const ret = await task(client);

      await client.query("COMMIT");

      return E.right(ret);
    } catch (e) {
      await client.query("ROLLBACK");

      return E.left(Error(`cause: ${e}`));
    } finally {
      client.release();
    }
  };

tx(pool, async client => {
  // 동일한 트랜잭션 내에서 데이터베이스에 두 번 별도로 호출
  await markAsFullyPaid(client, invoiceId);
  await markPaymentCompleted(client, paymentId);
})

await markAsFullyPaidAndPaymentCompleted(client, invoiceId, paymentId);

tx(pool, pipe(
  markAsFullyPaid(client, invoiceId),
  TE.apSecond(markPaymentCompleted(client, paymentId)),
  TE.orElse(err => unmarkAsFullyPaid(client, invoiceId)),
))