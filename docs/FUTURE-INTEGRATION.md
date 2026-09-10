# New Life customer experience and Ledger integration roadmap

This roadmap records the future connection between `newlife6miles` and `New-Life-Ledger`. It is intentionally separate from the current customer-facing improvements so that public browsing and ordering can evolve without exposing internal operations.

## Responsibilities

| Area | System of record | Customer-facing role |
|---|---|---|
| Shared product ID and product mapping | New Life Ledger | Display the matching product name and image |
| Production catalog, price, and stock | New Life Ledger | Show public-safe availability and quote status |
| Product descriptions and images | `newlife6miles` or shared media storage | Present product details and visual references |
| Customers and orders | New Life Ledger | Collect the customer request from the website |
| Staff confirmation | New Life Ledger and Telegram workflow | Return confirmed price, stock, and delivery details |

## Planned phases

### Phase 1: Shared product identity

Create a mapping table that gives each shared item a stable identifier, for example `bottle-06-blue`. Map that identifier to the Ledger `productKey`, the Miles product ID, the supported sizes, and the image URL. Do not match products by display name alone because Burmese names and size labels differ between the two repositories.

### Phase 2: Read-only public catalog

Expose a protected, public-safe Ledger endpoint for product availability and approved customer pricing. The endpoint must not return internal production counts, customer data, staff notes, or accounting information. The website should show only states such as available, out of stock, pre-order, and contact for price.

### Phase 3: Pending order intake

Send customer cart requests from `newlife6miles` to Ledger as `PENDING` orders. Include the shared product ID, requested unit, quantity, customer name, phone, township, delivery note, and website source. Staff must confirm price, stock, delivery, and payment before the request becomes a sale or stock movement.

### Phase 4: Status and customer follow-up

Return a safe order reference to the website. Add order-status messaging for received, reviewing, confirmed, preparing, dispatched, and completed states. Keep payment and accounting actions inside Ledger until the workflow has been tested and approved.

## Current implementation boundary

The website now exposes product details, a visible customer order action, a persistent My Order navigation link, a clearer cart journey, and a homepage order guide. The cart remains a customer request flow; final pricing and availability are still confirmed by the New Life counter.

## Safety rules

The website must never expose the Ledger application session, database URL, internal stock quantities, customer ledger history, or staff-only API routes. Any future integration should use a dedicated server-side endpoint, validate product IDs and quantities, rate-limit requests, and log the originating website request.

## Product gaps to resolve before full sync

The two repositories still have naming and coverage differences. Ledger has additional internal products such as 0.25, engine-oil, 45 kyat-thar, and several S+1/S+S variants. Miles has a customer-facing 0.85L round item that is not a direct Ledger catalog match. These items require explicit mapping decisions before they are made available through automated ordering.

---

*Maintained as an implementation roadmap for New Life Packaging.*
