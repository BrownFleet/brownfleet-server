--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "barcode-buddy";
--
-- Name: barcode-buddy; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "barcode-buddy" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='barcode-buddy'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: venues_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.venues_status_enum AS ENUM (
    'active',
    'inactive',
    'under construction'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assistance_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assistance_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_table_id uuid NOT NULL,
    request_type_id integer NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata jsonb
);


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    status text NOT NULL,
    image_url text,
    video_url text,
    discount_type text,
    discount_value numeric,
    combo_deal text,
    menu_items jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cart_id uuid NOT NULL,
    menu_item_id uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric NOT NULL,
    total_price numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_table_id uuid NOT NULL,
    user_id uuid NOT NULL,
    total_price numeric NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    quantity integer NOT NULL,
    threshold_value integer NOT NULL,
    unit_price numeric NOT NULL,
    expiration_date date,
    notes text,
    last_received timestamp with time zone,
    last_used timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: menu_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    menu_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    display_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    venue_id uuid NOT NULL
);


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    section_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    image_url text,
    is_vegan boolean DEFAULT false NOT NULL,
    is_gluten_free boolean DEFAULT false NOT NULL,
    is_spicy boolean DEFAULT false NOT NULL,
    allergens text[],
    available boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_discounted boolean DEFAULT false NOT NULL,
    discount_price numeric
);


--
-- Name: menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    currency text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    category_id uuid NOT NULL,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    price double precision NOT NULL,
    variants jsonb,
    image text,
    popular boolean DEFAULT false NOT NULL,
    available boolean DEFAULT true NOT NULL,
    "preparationTime" text,
    ingredients text[] DEFAULT '{}'::text[] NOT NULL,
    allergens text[] DEFAULT '{}'::text[] NOT NULL,
    calories integer,
    discount double precision DEFAULT '0'::double precision NOT NULL,
    dietary jsonb,
    rating double precision,
    "reviewsCount" integer,
    "comboDetails" jsonb,
    "internalNotes" text,
    status text DEFAULT 'draft'::text NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: order_customization_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_customization_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    venue_id uuid NOT NULL,
    request_details jsonb NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    responded_at timestamp with time zone
);


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    menu_item_id uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric NOT NULL,
    total_price numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: order_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    sender text NOT NULL
);


--
-- Name: order_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_status (
    status_id integer NOT NULL,
    status_name character varying(50) NOT NULL
);


--
-- Name: order_status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_status_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_status_status_id_seq OWNED BY public.order_status.status_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    total_price numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    order_status_id integer NOT NULL,
    venue_id uuid NOT NULL,
    table_number text NOT NULL
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    amount numeric NOT NULL,
    payment_method text NOT NULL,
    payment_status text NOT NULL,
    transaction_id text,
    payment_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: request_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.request_types (
    id integer NOT NULL,
    type_name text NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: request_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.request_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: request_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.request_types_id_seq OWNED BY public.request_types.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: surveillance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.surveillance (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    camera_name text NOT NULL,
    camera_type text NOT NULL,
    camera_location text NOT NULL,
    camera_status boolean NOT NULL,
    camera_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    team_name text NOT NULL,
    phone text,
    address text,
    working_hours integer NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    payment_type text NOT NULL,
    salary_or_rate numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    role_id integer NOT NULL,
    venue_id uuid NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    profile_picture text,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    role_id integer NOT NULL
);


--
-- Name: venue_daily_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_daily_analytics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_id uuid NOT NULL,
    date date NOT NULL,
    total_orders integer NOT NULL,
    orders_in_progress integer NOT NULL,
    cancelled_orders integer NOT NULL,
    total_revenue numeric NOT NULL,
    average_order_value numeric NOT NULL,
    customer_count integer NOT NULL,
    inventory_low_stock_count integer NOT NULL,
    employees_active_count integer NOT NULL,
    tables_filled integer NOT NULL,
    tables_empty integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: venue_tables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_tables (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_id uuid NOT NULL,
    table_number text NOT NULL,
    qr_code text NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    table_name text
);


--
-- Name: venue_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_types (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: venue_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.venue_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: venue_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.venue_types_id_seq OWNED BY public.venue_types.id;


--
-- Name: venue_washrooms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_washrooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_id uuid NOT NULL,
    navigational_direction text NOT NULL,
    location jsonb NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: venue_workers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_workers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venue_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    permissions jsonb,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: venues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venues (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    postal_code text NOT NULL,
    country text NOT NULL,
    phone_number text NOT NULL,
    website_url text,
    total_tables integer NOT NULL,
    capacity integer NOT NULL,
    status public.venues_status_enum DEFAULT 'active'::public.venues_status_enum NOT NULL,
    description text,
    logo_url text,
    business_hours jsonb NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    welcome_message text,
    usp text,
    specialties text[] NOT NULL,
    venue_type_id integer NOT NULL
);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: order_status status_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status ALTER COLUMN status_id SET DEFAULT nextval('public.order_status_status_id_seq'::regclass);


--
-- Name: request_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_types ALTER COLUMN id SET DEFAULT nextval('public.request_types_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: venue_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_types ALTER COLUMN id SET DEFAULT nextval('public.venue_types_id_seq'::regclass);


--
-- Data for Name: assistance_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assistance_requests (id, venue_table_id, request_type_id, status, created_at, updated_at, metadata) FROM stdin;
0ae3a93b-84ab-471e-b0d4-a6e9a414f899	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:27:57.792564+00	2025-03-05 21:27:57.792564+00	\N
e6aa2044-31b2-4cce-826c-3542dc8e87ae	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:35:22.610799+00	2025-03-05 21:35:22.610799+00	\N
e47d0229-e703-4842-adb9-1d28c9b02b81	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:37:39.799943+00	2025-03-05 21:37:39.799943+00	\N
3e347eac-e734-4c03-8a08-138da0d37279	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:38:07.997794+00	2025-03-05 21:38:07.997794+00	\N
de3494ee-b6dd-4253-bc9a-087157196bd5	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:38:45.104145+00	2025-03-05 21:38:45.104145+00	\N
ea30f857-83fd-4080-8790-c0ded0397b0f	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:40:24.934693+00	2025-03-05 21:40:24.934693+00	\N
8c66816d-c32d-40d3-984f-1cb873a20dfa	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:41:16.745561+00	2025-03-05 21:41:16.745561+00	\N
fe4bf13a-66ba-46f3-a37a-d9e43c512826	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-05 21:41:30.546105+00	2025-03-05 21:41:30.546105+00	\N
8fc2e72b-04c0-472e-b626-6c3be26d4fe8	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:06:18.713724+00	2025-03-06 13:06:18.713724+00	\N
4cf3bd95-6d2c-4169-b05a-6f424ecb6134	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:06:23.344022+00	2025-03-06 13:06:23.344022+00	\N
bbc97f9f-179d-49a5-b48c-1f2f19ccda56	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:07:05.55884+00	2025-03-06 13:07:05.55884+00	\N
35a6946d-b5eb-4eb4-b9ff-ff16ef1ebe98	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:08:23.182918+00	2025-03-06 13:08:23.182918+00	\N
85f79b4a-4ffa-4658-871e-5daa0a421072	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:13:02.177844+00	2025-03-06 13:13:02.177844+00	\N
4b561035-a346-444e-8164-0533b362f606	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:14:21.297852+00	2025-03-06 13:14:21.297852+00	\N
d72392c4-2c4e-4151-910b-2d185b4c0f7f	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:17:29.352146+00	2025-03-06 13:17:29.352146+00	\N
2dacdc64-1360-4f21-b2d4-2f9c809e5bc7	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:18:31.820318+00	2025-03-06 13:18:31.820318+00	\N
34be163a-b03b-41bf-a1bd-9d813aa48444	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:19:36.353711+00	2025-03-06 13:19:36.353711+00	\N
5f0a9c86-60ef-4dd5-b208-17d2f4b0c541	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-03-06 13:20:58.023569+00	2025-03-06 13:20:58.023569+00	\N
9ce4b70b-73ac-4204-b090-9a612d019337	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-04-01 15:58:31.433052+00	2025-04-01 15:58:31.433052+00	\N
6a4d8ed0-4870-4b40-a2a9-9687685d17dd	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-04-01 15:58:32.236183+00	2025-04-01 15:58:32.236183+00	\N
217168dc-cd84-4c65-b5b8-0cbfb570b1c6	2a5f2f79-b0de-426e-8b30-d558c0d3920c	1	pending	2025-04-01 15:58:32.471306+00	2025-04-01 15:58:32.471306+00	\N
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaigns (id, title, description, start_date, end_date, status, image_url, video_url, discount_type, discount_value, combo_deal, menu_items, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (id, cart_id, menu_item_id, quantity, price, total_price, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts (id, venue_table_id, user_id, total_price, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inventory (id, name, description, quantity, threshold_value, unit_price, expiration_date, notes, last_received, last_used, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: menu_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu_categories (id, menu_id, name, description, display_order, created_at, updated_at, venue_id) FROM stdin;
5d61660b-6326-4fdc-ad33-7426a3348526	d760209e-17cd-441a-a095-860417321ccd	Snacks	Quick bites to keep you in the game	1	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
cae08550-1255-4a19-bdb3-b1a691b4ce0b	d760209e-17cd-441a-a095-860417321ccd	Drinks	Refreshing beverages	2	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
71ab0530-6f24-4d77-b324-0322ca07a0fc	22b752a6-f41f-45bd-a724-58760db0dfab	Signature Cocktails	Exclusive drinks for VIPs	1	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
c1692d82-779f-4859-bfae-dc67320bba30	22b752a6-f41f-45bd-a724-58760db0dfab	Premium Spirits	Top-shelf selections	2	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
607fe1cb-be13-43ac-98e9-15b610c47016	32c50d09-b552-44d8-a631-2483752aee12	Appetizers	Start your meal with flair	1	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
eed00b32-2e2e-4f4b-8e89-a0a8706968fc	32c50d09-b552-44d8-a631-2483752aee12	Main Courses	Satisfying entrees	2	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
165617b9-678c-4f12-91c9-461ab79d3e34	32c50d09-b552-44d8-a631-2483752aee12	Desserts	Sweet finishes	3	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
38cbcbdd-0282-485d-8d14-82a4f983aa10	54aa4b2e-c7b1-495a-a3fe-ea0b92ea3c83	Classic Cocktails	Timeless favorites	1	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
155157d7-b8ce-4ebf-8b1c-2e7e2852e67f	54aa4b2e-c7b1-495a-a3fe-ea0b92ea3c83	House Specials	Unique creations	2	2025-03-01 16:36:51.838048+00	2025-03-01 16:36:51.838048+00	2f591481-0742-4f7d-93fa-8cafac27a57c
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menu_items (id, section_id, name, description, price, image_url, is_vegan, is_gluten_free, is_spicy, allergens, available, created_at, updated_at, is_discounted, discount_price) FROM stdin;
d9d537bc-49b1-4ad9-9874-0269dec5f1ce	5d61660b-6326-4fdc-ad33-7426a3348526	Loaded Nachos	Crispy tortilla chips with melted cheese, jalapeños, and salsa	8.99	https://luckystarcasino.com/nachos.jpg	f	f	t	{dairy}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
8782c092-507a-44db-b1b8-a80366ad20b5	5d61660b-6326-4fdc-ad33-7426a3348526	Chicken Wings	Buffalo-style wings with ranch dip	10.99	https://luckystarcasino.com/wings.jpg	f	f	t	{dairy}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	t	8.49
55ffed71-11e4-4e2e-b362-1febaed8d30d	cae08550-1255-4a19-bdb3-b1a691b4ce0b	Draft Beer	Cold and crisp local brew	6.99	https://luckystarcasino.com/beer.jpg	f	f	f	{gluten}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
6c4e121b-aaea-4804-b1f1-9190261a8f83	cae08550-1255-4a19-bdb3-b1a691b4ce0b	Cola	Classic soda served ice-cold	3.99	https://luckystarcasino.com/cola.jpg	t	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
6b587cc4-6332-4974-9681-8aae9eda9210	71ab0530-6f24-4d77-b324-0322ca07a0fc	Golden Jackpot	Whiskey, honey, and a splash of gold dust	15.99	https://luckystarcasino.com/goldenjackpot.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
9d68274b-f3ad-4629-8183-08e67a80a491	71ab0530-6f24-4d77-b324-0322ca07a0fc	Ace of Spades	Vodka, blackberry liqueur, and sparkling wine	17.99	https://luckystarcasino.com/aceofspades.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
5caf265e-9f97-451c-9af3-9ac25ada5323	c1692d82-779f-4859-bfae-dc67320bba30	Single Malt Scotch	Aged 18 years, served neat or on the rocks	22.99	https://luckystarcasino.com/scotch.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
3613431b-8df2-4d64-b447-0e7fc5aba720	607fe1cb-be13-43ac-98e9-15b610c47016	Bruschetta	Toasted bread with fresh tomatoes, basil, and olive oil	7.99	https://tastehaven.com/bruschetta.jpg	t	f	f	{gluten}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
7878df4e-99d2-45a1-8fa1-694ae9c14a70	607fe1cb-be13-43ac-98e9-15b610c47016	Stuffed Mushrooms	Mushrooms filled with garlic cream cheese	9.99	https://tastehaven.com/mushrooms.jpg	f	f	f	{dairy}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
31b73bbf-18fe-46eb-a0d7-ffa7d7266567	eed00b32-2e2e-4f4b-8e89-a0a8706968fc	Truffle Risotto	Creamy Arborio rice with truffle oil and Parmesan	18.99	https://tastehaven.com/risotto.jpg	f	t	f	{dairy}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
9a132cb9-d0fd-4ea3-a18d-2858c97d8153	eed00b32-2e2e-4f4b-8e89-a0a8706968fc	Grilled Salmon	Wild-caught salmon with lemon herb sauce	22.99	https://tastehaven.com/salmon.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
146d2211-893e-4f09-a973-287a99d62160	165617b9-678c-4f12-91c9-461ab79d3e34	Tiramisu	Layers of mascarpone, coffee, and ladyfingers	8.99	https://tastehaven.com/tiramisu.jpg	f	f	f	{dairy,eggs,gluten}	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	t	6.99
718147cb-f0fe-4d70-b126-e25ce869de6e	38cbcbdd-0282-485d-8d14-82a4f983aa10	Old Fashioned	Bourbon, sugar, and bitters with an orange twist	11.99	https://tastehaven.com/oldfashioned.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
89c0a363-c9c4-43e2-a097-dfdb3ef4928a	38cbcbdd-0282-485d-8d14-82a4f983aa10	Margarita	Tequila, lime, and triple sec with a salt rim	10.99	https://tastehaven.com/margarita.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
d80df6a8-eb66-4d1b-90ce-d8b34e648dfe	155157d7-b8ce-4ebf-8b1c-2e7e2852e67f	Smoky Paloma	Mezcal, grapefruit, and a smoked salt rim	13.99	https://tastehaven.com/paloma.jpg	f	t	f	\N	t	2025-03-01 16:37:14.583169+00	2025-03-01 16:37:14.583169+00	f	\N
\.


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus (id, venue_id, name, description, currency, is_active, created_at, updated_at, category_id, tags, price, variants, image, popular, available, "preparationTime", ingredients, allergens, calories, discount, dietary, rating, "reviewsCount", "comboDetails", "internalNotes", status) FROM stdin;
ab484514-8e43-48bf-aff4-7e893822680a	012eeaab-5160-4e61-93af-41fdb59250f2	Garlic Breadsticks	Warm breadsticks brushed with garlic butter and herbs	USD	t	2025-05-23 22:44:27.489757+00	2025-05-23 22:44:27.489757+00	5d61660b-6326-4fdc-ad33-7426a3348526	{Vegetarian,"Kids Favorite"}	5.99	[]	/images/appetizers/garlic-breadsticks.jpg	t	t	10 min	{Flour,Garlic,Butter,Herbs}	{Gluten,Dairy}	320	0	{"vegan": false, "glutenFree": false, "vegetarian": true}	4.3	78	\N	Offer garlic dip by default	published
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1748035406085	RenameMenuSectionsToMenuCategories1748035406085
2	1748039626399	Migrations1748039626399
3	1748098937186	Migrations1748098937186
\.


--
-- Data for Name: order_customization_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_customization_requests (id, order_id, venue_id, request_details, status, created_at, responded_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, order_id, menu_item_id, quantity, price, total_price, created_at, updated_at) FROM stdin;
f4509a89-c160-4088-b5dd-cb1758633184	097743ab-3983-4e25-930b-e1a672170016	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	2	8.99	17.98	2025-03-02 14:30:00+00	2025-03-02 14:30:00+00
90e4c8ce-ab69-4e95-b246-48ee7b689e79	097743ab-3983-4e25-930b-e1a672170016	55ffed71-11e4-4e2e-b362-1febaed8d30d	1	6.99	6.99	2025-03-02 14:30:00+00	2025-03-02 14:30:00+00
487fcd4d-bc21-421d-b97e-1275a30297bf	84c58948-d2ef-457a-a4e1-f30582126e7d	9a132cb9-d0fd-4ea3-a18d-2858c97d8153	1	22.99	22.99	2025-03-02 12:00:00+00	2025-03-02 12:00:00+00
eed381f7-41d8-42ae-abc4-0d156b198ed5	84c58948-d2ef-457a-a4e1-f30582126e7d	89c0a363-c9c4-43e2-a097-dfdb3ef4928a	1	8.98	8.98	2025-03-02 12:00:00+00	2025-03-02 12:00:00+00
16c9d945-b28c-4bfc-876c-1818198c9d49	d9dbdb4d-c715-46aa-b95a-33dc1b3473f5	8782c092-507a-44db-b1b8-a80366ad20b5	1	10.99	10.99	2025-04-02 18:10:23.874054+00	2025-04-02 18:10:23.874054+00
0dffe8a1-3943-43b5-98cd-6b76ff774e3a	191407d9-a195-4daa-aa6c-a9acc7b06ffc	8782c092-507a-44db-b1b8-a80366ad20b5	3	10.99	32.97	2025-04-03 21:05:03.611438+00	2025-04-03 21:05:03.611438+00
50082a19-9700-4379-9d1c-e2c24e9551a2	191407d9-a195-4daa-aa6c-a9acc7b06ffc	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	4	8.99	35.96	2025-04-03 21:05:03.611438+00	2025-04-03 21:05:03.611438+00
5e78a98d-4d0e-406b-8b9f-42a9e24972d9	73ec1f41-a169-448f-8a6c-7ec1dc5dc085	8782c092-507a-44db-b1b8-a80366ad20b5	3	10.99	32.97	2025-04-03 21:05:11.195471+00	2025-04-03 21:05:11.195471+00
fdeb7a07-6aba-4553-bc1f-d3433c182437	73ec1f41-a169-448f-8a6c-7ec1dc5dc085	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	4	8.99	35.96	2025-04-03 21:05:11.195471+00	2025-04-03 21:05:11.195471+00
3476bbdb-f484-45ed-9ce8-cee3e0ac7ffd	4ea683c6-39e7-4953-bbef-f43aa1e3dce7	8782c092-507a-44db-b1b8-a80366ad20b5	3	10.99	32.97	2025-04-03 21:06:15.120632+00	2025-04-03 21:06:15.120632+00
df16db85-b23d-4017-9fe2-6f1346c9668e	4ea683c6-39e7-4953-bbef-f43aa1e3dce7	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	4	8.99	35.96	2025-04-03 21:06:15.120632+00	2025-04-03 21:06:15.120632+00
81cc6eec-06d0-4123-8c40-a029767c2429	b4883668-a363-48f8-9cb0-735a27611120	8782c092-507a-44db-b1b8-a80366ad20b5	1	10.99	10.99	2025-04-03 21:14:34.485523+00	2025-04-03 21:14:34.485523+00
32dcdc45-8995-42b8-8f26-a158d6e03366	b4883668-a363-48f8-9cb0-735a27611120	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	1	8.99	8.99	2025-04-03 21:14:34.485523+00	2025-04-03 21:14:34.485523+00
6edf52c3-3294-4880-adfd-2ce657bde67e	52b8480e-f36c-4e06-8ab0-0988e8d1e854	8782c092-507a-44db-b1b8-a80366ad20b5	5	10.99	54.95	2025-04-04 18:22:50.22656+00	2025-04-04 18:22:50.22656+00
33f59035-cacd-48a6-98d9-e54b9682a662	52b8480e-f36c-4e06-8ab0-0988e8d1e854	d9d537bc-49b1-4ad9-9874-0269dec5f1ce	6	8.99	53.94	2025-04-04 18:22:50.22656+00	2025-04-04 18:22:50.22656+00
d6f7b4d7-93e1-4df6-8a3b-099fab4d8b54	cd757001-d91b-462a-9b4b-74d2549e361a	6c4e121b-aaea-4804-b1f1-9190261a8f83	1	3.99	3.99	2025-04-05 18:21:23.788628+00	2025-04-05 18:21:23.788628+00
c1da3a71-2627-41c8-9920-545298a74470	f89429e9-17d2-4817-84bf-3511fd672548	55ffed71-11e4-4e2e-b362-1febaed8d30d	8	6.99	55.92	2025-04-06 18:51:37.664465+00	2025-04-06 18:51:37.664465+00
b9bdc882-0cd9-401b-89e2-ee91bd68baa4	f89429e9-17d2-4817-84bf-3511fd672548	6c4e121b-aaea-4804-b1f1-9190261a8f83	7	3.99	27.93	2025-04-06 18:51:37.664465+00	2025-04-06 18:51:37.664465+00
90291711-6b58-4135-84b3-afb504c205e0	0af86b68-56fa-49e1-90d9-06f7cc04be84	55ffed71-11e4-4e2e-b362-1febaed8d30d	8	6.99	55.92	2025-04-06 18:51:39.398269+00	2025-04-06 18:51:39.398269+00
437b446a-1eff-42d8-9681-90320a7fa3e1	0af86b68-56fa-49e1-90d9-06f7cc04be84	6c4e121b-aaea-4804-b1f1-9190261a8f83	7	3.99	27.93	2025-04-06 18:51:39.398269+00	2025-04-06 18:51:39.398269+00
\.


--
-- Data for Name: order_messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_messages (id, order_id, message, created_at, sender) FROM stdin;
\.


--
-- Data for Name: order_status; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_status (status_id, status_name) FROM stdin;
1	Pending
2	In Progress
3	Dispatch
4	Complete
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, total_price, created_at, updated_at, order_status_id, venue_id, table_number) FROM stdin;
84c58948-d2ef-457a-a4e1-f30582126e7d	31.97	2025-03-02 12:00:00+00	2025-03-02 12:45:00+00	4	2f591481-0742-4f7d-93fa-8cafac27a57c	2
097743ab-3983-4e25-930b-e1a672170016	24.98	2025-03-02 14:30:00+00	2025-03-02 14:35:00+00	3	012eeaab-5160-4e61-93af-41fdb59250f2	1
9728e6b4-7e5b-41bd-81f4-13856a587fbf	10.99	2025-04-02 17:32:01.896932+00	2025-04-02 17:32:01.896932+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
0532dd0f-803e-495e-a18d-9adffd8380fe	10.99	2025-04-02 17:32:30.208658+00	2025-04-02 17:32:30.208658+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
70a9b41f-9ccd-4841-a504-8d77180494b1	10.99	2025-04-02 18:07:15.62533+00	2025-04-02 18:07:15.62533+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
7fcf10c7-236d-4a68-afa4-36256a1f3b39	10.99	2025-04-02 18:07:16.671715+00	2025-04-02 18:07:16.671715+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
4657c48c-0542-4770-91b8-ad0c62863bf5	10.99	2025-04-02 18:09:25.806214+00	2025-04-02 18:09:25.806214+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
1507cb46-6d7d-4ed5-8c9a-0cae3899d16f	10.99	2025-04-02 18:09:45.958591+00	2025-04-02 18:09:45.958591+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
d9dbdb4d-c715-46aa-b95a-33dc1b3473f5	10.99	2025-04-02 18:10:23.770961+00	2025-04-02 18:10:23.770961+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
191407d9-a195-4daa-aa6c-a9acc7b06ffc	68.93	2025-04-03 21:05:03.198743+00	2025-04-03 21:05:03.198743+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
73ec1f41-a169-448f-8a6c-7ec1dc5dc085	68.93	2025-04-03 21:05:11.021732+00	2025-04-03 21:05:11.021732+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
4ea683c6-39e7-4953-bbef-f43aa1e3dce7	68.93	2025-04-03 21:06:15.014864+00	2025-04-03 21:06:15.014864+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
b4883668-a363-48f8-9cb0-735a27611120	19.98	2025-04-03 21:14:34.384205+00	2025-04-03 21:14:34.384205+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
52b8480e-f36c-4e06-8ab0-0988e8d1e854	108.89	2025-04-04 18:22:50.048306+00	2025-04-04 18:22:50.048306+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
cd757001-d91b-462a-9b4b-74d2549e361a	3.99	2025-04-05 18:21:23.429821+00	2025-04-05 18:21:23.429821+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
f89429e9-17d2-4817-84bf-3511fd672548	83.85	2025-04-06 18:51:37.263828+00	2025-04-06 18:51:37.263828+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
0af86b68-56fa-49e1-90d9-06f7cc04be84	83.85	2025-04-06 18:51:38.577607+00	2025-04-06 18:51:38.577607+00	1	012eeaab-5160-4e61-93af-41fdb59250f2	1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, order_id, amount, payment_method, payment_status, transaction_id, payment_date, created_at, updated_at) FROM stdin;
9a5b1aea-8518-4a32-a9c4-259f9c34202e	097743ab-3983-4e25-930b-e1a672170016	24.98	credit_card	completed	txn_1677851400000	2025-03-02 14:35:00+00	2025-03-02 14:35:00+00	2025-03-02 14:35:00+00
8ae3f459-9bf2-4773-85b7-fde392f1bf33	84c58948-d2ef-457a-a4e1-f30582126e7d	31.97	cash	completed	\N	2025-03-02 12:15:00+00	2025-03-02 12:15:00+00	2025-03-02 12:15:00+00
\.


--
-- Data for Name: request_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.request_types (id, type_name, description, is_active, created_at, updated_at) FROM stdin;
1	call_staff	Request staff to come to the table	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
2	clean_table	Request table cleaning	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
3	ask_for_bill	Request the bill	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
4	order_food	Request to place a food order	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
5	refill_water	Request water refill	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
6	fix_chair	Request chair repair	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
7	extra_napkins	Request additional napkins	t	2025-03-05 21:12:47.87536+00	2025-03-05 21:12:47.87536+00
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (role_id, role_name) FROM stdin;
0	Admin
1	Manager
2	Team_Member
\.


--
-- Data for Name: surveillance; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.surveillance (id, camera_name, camera_type, camera_location, camera_status, camera_url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teams (id, user_id, team_name, phone, address, working_hours, start_date, end_date, is_active, payment_type, salary_or_rate, created_at, updated_at, role_id, venue_id) FROM stdin;
a8146206-8af9-4350-8149-ea918b2f4f41	c7631a04-dcff-4126-b37e-ddf7781f1fc4	Casino Operations	555-111-2222	789 Vegas Blvd, Las Vegas, NV 89109	40	2025-01-01 00:00:00+00	\N	t	monthly	6000.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	0	012eeaab-5160-4e61-93af-41fdb59250f2
3921ce7b-61b0-4928-a0e3-0098a10711b9	f2c5db8a-f521-47b8-b7da-5a68d32370c5	Casino Operations	555-333-4444	456 Jackpot Lane, Las Vegas, NV 89109	45	2025-01-15 00:00:00+00	\N	t	monthly	4500.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	1	012eeaab-5160-4e61-93af-41fdb59250f2
a4c4a74a-0f98-4a3f-bede-9b24142ad020	d1c24c2e-35fa-42fb-8db9-72fc6c346777	Gaming Crew	555-555-6666	123 Dealer St, Las Vegas, NV 89109	38	2025-02-01 00:00:00+00	\N	t	hourly	25.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	2	012eeaab-5160-4e61-93af-41fdb59250f2
0d806a62-c961-4bf2-b702-944e65fb9e34	ec9b9eea-4cca-4816-93e0-326a22cc6b10	Restaurant Management	555-777-8888	101 Main St, New York, NY 10001	40	2025-01-01 00:00:00+00	\N	t	monthly	5500.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	0	2f591481-0742-4f7d-93fa-8cafac27a57c
f7440bc8-d1d7-43fe-bbd9-8f91120ee2b2	06599908-5bc5-4d42-999c-aa5ffdff8200	Restaurant Management	555-999-0000	123 Flavor Street, New York, NY 10001	40	2025-01-10 00:00:00+00	\N	t	monthly	4000.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	1	2f591481-0742-4f7d-93fa-8cafac27a57c
8f11298d-b881-4232-855a-e74a6d5cc7ba	0bb9f81a-7803-4b34-a349-55416611fb5c	Kitchen Crew	555-222-3333	456 Chef Ave, New York, NY 10001	35	2025-02-01 00:00:00+00	\N	t	hourly	28.00	2025-03-01 16:47:42.400775+00	2025-03-01 16:47:42.400775+00	2	2f591481-0742-4f7d-93fa-8cafac27a57c
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password, first_name, last_name, profile_picture, is_deleted, created_at, updated_at, role_id) FROM stdin;
c7631a04-dcff-4126-b37e-ddf7781f1fc4	admin@luckystarcasino.com	hashed_password_1	John	Doe	https://luckystarcasino.com/john.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	0
f2c5db8a-f521-47b8-b7da-5a68d32370c5	manager@luckystarcasino.com	hashed_password_2	Sarah	Smith	https://luckystarcasino.com/sarah.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	1
d1c24c2e-35fa-42fb-8db9-72fc6c346777	dealer@luckystarcasino.com	hashed_password_3	Mike	Johnson	https://luckystarcasino.com/mike.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	2
ec9b9eea-4cca-4816-93e0-326a22cc6b10	admin@tastehaven.com	hashed_password_4	Emma	Wilson	https://tastehaven.com/emma.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	0
06599908-5bc5-4d42-999c-aa5ffdff8200	manager@tastehaven.com	hashed_password_5	David	Lee	https://tastehaven.com/david.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	1
0bb9f81a-7803-4b34-a349-55416611fb5c	chef@tastehaven.com	hashed_password_6	Lisa	Brown	https://tastehaven.com/lisa.jpg	f	2025-03-01 16:44:58.884333+00	2025-03-01 16:44:58.884333+00	2
fdc0082a-0fb8-48ad-87eb-0b19cf02f661	rishav@c.com	$2b$10$eysMwiFw1W0lTkRqd0kYH.B930QiNhcr66wRcmFoN6xYUGYUkk8Oi	Rishav	Rapta	\N	f	2025-05-22 20:37:15.398036+00	2025-05-22 20:37:15.398036+00	2
\.


--
-- Data for Name: venue_daily_analytics; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_daily_analytics (id, venue_id, date, total_orders, orders_in_progress, cancelled_orders, total_revenue, average_order_value, customer_count, inventory_low_stock_count, employees_active_count, tables_filled, tables_empty, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: venue_tables; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_tables (id, venue_id, table_number, qr_code, status, created_at, updated_at, table_name) FROM stdin;
2a5f2f79-b0de-426e-8b30-d558c0d3920c	012eeaab-5160-4e61-93af-41fdb59250f2	1	https://luckystarcasino.com/qr/table1	occupied	2025-03-01 16:00:00+00	2025-04-06 18:51:38+00	Table 1
d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a	2f591481-0742-4f7d-93fa-8cafac27a57c	2	https://tastehaven.com/qr/table2	available	2025-03-01 16:00:00+00	2025-03-02 12:45:00+00	Table 2
e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b	012eeaab-5160-4e61-93af-41fdb59250f2	3	https://luckystarcasino.com/qr/table3	reserved	2025-03-01 16:00:00+00	2025-04-03 21:00:00+00	VIP Table
\.


--
-- Data for Name: venue_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_types (id, name) FROM stdin;
1	Casino
2	Restaurant
3	Bar
\.


--
-- Data for Name: venue_washrooms; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_washrooms (id, venue_id, navigational_direction, location, status, created_at, updated_at) FROM stdin;
f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c	012eeaab-5160-4e61-93af-41fdb59250f2	Near the main bar, left side	{"floor": 1, "section": "Bar Area"}	available	2025-03-01 16:00:00+00	2025-03-01 16:00:00+00
a7b8c9d0-e1f2-4a3b-5c6d-7e8f9a0b1c2d	2f591481-0742-4f7d-93fa-8cafac27a57c	Back of dining area, right hallway	{"floor": 1, "section": "Dining Area"}	occupied	2025-03-01 16:00:00+00	2025-03-02 12:00:00+00
b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e	012eeaab-5160-4e61-93af-41fdb59250f2	Near slot machines, east wing	{"floor": 2, "section": "Gaming Floor"}	out_of_order	2025-03-01 16:00:00+00	2025-04-03 21:00:00+00
\.


--
-- Data for Name: venue_workers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_workers (id, venue_id, user_id, role_id, permissions, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: venues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venues (id, name, address, city, state, postal_code, country, phone_number, website_url, total_tables, capacity, status, description, logo_url, business_hours, is_deleted, created_at, updated_at, welcome_message, usp, specialties, venue_type_id) FROM stdin;
012eeaab-5160-4e61-93af-41fdb59250f2	Lucky Star Casino	789 Vegas Blvd	Las Vegas	NV	89109	USA	555-111-2222	https://luckystarcasino.com	50	500	active	Premier casino with dining and entertainment	https://luckystarcasino.com/logo.png	{"fri": "00:00-23:59", "mon": "00:00-23:59", "sat": "00:00-23:59", "sun": "00:00-23:59", "thu": "00:00-23:59", "tue": "00:00-23:59", "wed": "00:00-23:59"}	f	2025-03-01 16:00:00+00	2025-03-01 16:00:00+00	Welcome to Lucky Star!	Top-tier gaming and dining	{gaming,cocktails}	1
2f591481-0742-4f7d-93fa-8cafac27a57c	Taste Haven	101 Main St	New York	NY	10001	USA	555-777-8888	https://tastehaven.com	30	150	active	Fine dining with a modern twist	https://tastehaven.com/logo.png	{"fri": "11:00-23:00", "mon": "11:00-22:00", "sat": "11:00-23:00", "sun": "12:00-21:00", "thu": "11:00-22:00", "tue": "11:00-22:00", "wed": "11:00-22:00"}	f	2025-03-01 16:00:00+00	2025-03-01 16:00:00+00	Enjoy your meal at Taste Haven!	Fresh ingredients, craft cocktails	{seafood,desserts}	2
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 3, true);


--
-- Name: order_status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_status_status_id_seq', 1, false);


--
-- Name: request_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.request_types_id_seq', 1, false);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- Name: venue_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.venue_types_id_seq', 1, false);


--
-- Name: order_items PK_005269d8574e6fac0493715c308; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY (id);


--
-- Name: surveillance PK_0369268a70fd28161375e02aff4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.surveillance
    ADD CONSTRAINT "PK_0369268a70fd28161375e02aff4" PRIMARY KEY (id);


--
-- Name: payments PK_197ab7af18c93fbb0c9b28b4a59; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY (id);


--
-- Name: venue_types PK_225080d3c45297d563c3e03d190; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_types
    ADD CONSTRAINT "PK_225080d3c45297d563c3e03d190" PRIMARY KEY (id);


--
-- Name: venue_daily_analytics PK_235592f2d6d173b86770caf4e7c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_daily_analytics
    ADD CONSTRAINT "PK_235592f2d6d173b86770caf4e7c" PRIMARY KEY (id);


--
-- Name: order_messages PK_25d8eb6fb6e1ccb6b33e034ee28; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_messages
    ADD CONSTRAINT "PK_25d8eb6fb6e1ccb6b33e034ee28" PRIMARY KEY (id);


--
-- Name: menus PK_3fec3d93327f4538e0cbd4349c4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY (id);


--
-- Name: menu_items PK_57e6188f929e5dc6919168620c8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY (id);


--
-- Name: venue_washrooms PK_595bb3fec3e5d467650bd647da0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_washrooms
    ADD CONSTRAINT "PK_595bb3fec3e5d467650bd647da0" PRIMARY KEY (id);


--
-- Name: venue_tables PK_6b5ca0ab2b9cba8cd9d1da368e5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_tables
    ADD CONSTRAINT "PK_6b5ca0ab2b9cba8cd9d1da368e5" PRIMARY KEY (id);


--
-- Name: cart_items PK_6fccf5ec03c172d27a28a82928b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY (id);


--
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- Name: request_types PK_795c261c2ebf6beb3f417acd40b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_types
    ADD CONSTRAINT "PK_795c261c2ebf6beb3f417acd40b" PRIMARY KEY (id);


--
-- Name: teams PK_7e5523774a38b08a6236d322403; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id);


--
-- Name: inventory PK_82aa5da437c5bbfb80703b08309; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY (id);


--
-- Name: campaigns PK_831e3fcd4fc45b4e4c3f57a9ee4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: assistance_requests PK_944a7bc065921be9d453c8d4957; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assistance_requests
    ADD CONSTRAINT "PK_944a7bc065921be9d453c8d4957" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: carts PK_b5f695a59f5ebb50af3c8160816; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY (id);


--
-- Name: venues PK_cb0f885278d12384eb7a81818be; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venues
    ADD CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY (id);


--
-- Name: menu_categories PK_d9f9554edc03170cba756fecdb9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_categories
    ADD CONSTRAINT "PK_d9f9554edc03170cba756fecdb9" PRIMARY KEY (id);


--
-- Name: venue_workers PK_e0d7a2006fabe443efb2972f635; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_workers
    ADD CONSTRAINT "PK_e0d7a2006fabe443efb2972f635" PRIMARY KEY (id);


--
-- Name: order_customization_requests PK_f29e22956f55df7a48cd5dc72b1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_customization_requests
    ADD CONSTRAINT "PK_f29e22956f55df7a48cd5dc72b1" PRIMARY KEY (id);


--
-- Name: order_status order_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (status_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- PostgreSQL database dump complete
--

