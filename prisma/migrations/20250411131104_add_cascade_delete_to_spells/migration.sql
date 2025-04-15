-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "spellbookId" INTEGER NOT NULL,
    CONSTRAINT "Spell_spellbookId_fkey" FOREIGN KEY ("spellbookId") REFERENCES "Spellbook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Spell" ("description", "id", "image", "spellbookId", "title") SELECT "description", "id", "image", "spellbookId", "title" FROM "Spell";
DROP TABLE "Spell";
ALTER TABLE "new_Spell" RENAME TO "Spell";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
