
CREATE TABLE users
(
    id SERIAL  ,
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
;

CREATE INDEX "email_index"
    ON users USING btree
    (emailid COLLATE pg_catalog."default")
    TABLESPACE pg_default;

    CREATE INDEX "phone_index"
    ON users USING btree
    (phone COLLATE pg_catalog."default")
    TABLESPACE pg_default;

insert into users(username, emailid, phone, passwordhash, status, userinfo, created, updated)
values ('shiva','shiva@us.com', '123', '65c23a931186dd9e8b0f46832e632c287dc28322', '1','{}', '2019-08-31 07:12:17.552+05:30', '2019-08-31 07:12:17.552+05:30');

insert into users(username, emailid, phone, passwordhash, status, userinfo, created, updated)
values ('kumar','kumar@us.com', '456', '65c23a931186dd9e8b0f46832e632c287dc28322', '1','{}', '2019-08-31 07:12:17.552+05:30', '2019-08-31 07:12:17.552+05:30');



