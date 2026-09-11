/*
  Warnings:

  - You are about to drop the column `slug` on the `vendors` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "vendors_slug_key";

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "slug";
