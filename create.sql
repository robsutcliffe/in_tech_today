CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;

create table posts
(
    id         serial
        primary key,
    blog       varchar(255),
    title      varchar(255),
    href       varchar(255),
    created_at date,
    updated_at date,
    tags       integer[],
    summary    text[]
);

create table posts_holding_pen
(
    href   varchar,
    title  varchar,
    blog   varchar,
    ignore boolean default false
);

create table tags
(
    name     varchar               not null,
    soundex  varchar               not null,
    approved boolean default false not null,
    id       serial
        primary key
        unique
);