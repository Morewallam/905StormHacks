DROP TABLE users;

CREATE TABLE users(
    user_id INTEGER PRIMARY KEY,
    name    TEXT    NOT NULL,
    madness INTEGER
);

DROP TABLE flash_cards;

CREATE TABLE flash_cards(
    card_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    front   TEXT    NOT NULL,
    back    TEXT    NOT NULL,
    times_correct INTEGER NOT NULL,
    times_tried INTEGER NOT NULL CHECK(times_tried >= times_correct),
    mad INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

DROP TABLE attempts;

CREATE TABLE attempts(
    user_id INTEGER NOT NULL,
    attempt_id INTEGER NOT NULL,
    PRIMARY KEY(user_id,attempt_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);


insert into users(name) values ('Sean');

insert into flash_cards (user_id, front, back, times_correct, times_tried) values (1,'The Front', 'The Back',0,0);

insert into attempts values (1,1);



