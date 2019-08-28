
CREATE TABLE users
(
    id SERIAL integer ,
    username text COLLATE pg_catalog."default" NOT NULL,
    emailid text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    passwordhash text COLLATE pg_catalog."default",
    status integer NOT NULL DEFAULT 1,
    userinfo json NOT NULL DEFAULT '{}'::json,
    created timestamp(3) with time zone NOT NULL,
    updated timestamp(3) with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (emailid),
    CONSTRAINT unique_phone UNIQUE (emailid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE INDEX "email_index"
    ON public.users USING btree
    (emailid COLLATE pg_catalog."default")
    TABLESPACE pg_default;

    CREATE INDEX "phone_index"
    ON public.users USING btree
    (phone COLLATE pg_catalog."default")
    TABLESPACE pg_default;



