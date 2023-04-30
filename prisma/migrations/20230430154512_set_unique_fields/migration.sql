/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Documentation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Documentation_slug_key` ON `Documentation`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Keyword_name_key` ON `Keyword`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
