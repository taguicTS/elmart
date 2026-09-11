/*
  Warnings:

  - Made the column `xendit_account_number` on table `vendors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storeImage` on table `vendors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "xendit_account_number" SET NOT NULL,
ALTER COLUMN "storeImage" SET NOT NULL;
