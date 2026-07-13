create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  destination_interest text,
  message text,
  country text,
  noOfPersons text,
  travelDates date,
  duration text,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id bigserial primary key,
  booking_reference text not null unique,
  package_id text,
  package_slug text,
  package_title text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  amount_inr numeric(12,2) not null,
  amount_usd numeric(12,2) not null,
  currency text not null default 'USD',
  payment_status text not null default 'created',
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  provider text not null default 'razorpay',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_payment_status_idx on public.payments (payment_status);
create index if not exists payments_razorpay_order_id_idx on public.payments (razorpay_order_id);
