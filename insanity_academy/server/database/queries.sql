-- PARTS NEEDED FOR QUIZ

-- GET ALL THE CARDS
SELECT * FROM flash_cards;
-- Returns 
-- card_id
--

-- GET A SPECIFIC card from the user
SELECT * FROM flash_cards WHERE card_id = ${id};

--Update the value of a card
UPDATE flash_cards
SET  times_correct = times_correct+${correct}
    times_tried = times_tried + 1

WHERE
    card_id = ${id};


