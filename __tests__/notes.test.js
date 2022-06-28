const fs = require("fs");

const { notes } = require('../db/db.json');

test("creates a note object", () => {
  const note = createNewNote(
    { title: "Darlene", text: "jhgdja3ng2" },
    notes
  );

  expect(note.title).toBe("Darlene");
  expect(note.text).toBe("jhgdja3ng2");
});


test("finds by id", () => {
  const startingNotes = [
    {
      id: "3",
      title: "Darlene",
      text: "Roger",
    },
    {
      id: "4",
      title: "Roger",
      text: "Darlene",
    },
  ];

  const result = findById("3", startingNotes);

  expect(result.title).toBe("Darlene");
});
