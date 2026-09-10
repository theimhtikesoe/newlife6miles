export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ledgerUrl = String(
    process.env.LEDGER_ORDER_IMPORT_URL || "https://newlifeledger.vercel.app/api/orders/customer-website",
  ).trim();
  const secret = String(process.env.CUSTOMER_WEBSITE_ORDER_SECRET || "").trim();

  if (!secret) {
    console.error("CUSTOMER_WEBSITE_ORDER_SECRET is not configured");
    return response.status(503).json({ ok: false, error: "Ledger sync is not configured." });
  }

  try {
    const upstream = await fetch(ledgerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-customer-website-secret": secret,
      },
      body: JSON.stringify(request.body || {}),
    });
    const payload = await upstream.json().catch(() => ({ ok: false, error: "Invalid Ledger response" }));
    return response.status(upstream.status).json(payload);
  } catch (error) {
    console.error("Ledger website order sync failed", error);
    return response.status(502).json({ ok: false, error: "Ledger sync request failed." });
  }
}
