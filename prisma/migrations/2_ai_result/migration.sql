/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_id_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_share_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_share_post_id_fkey";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "Share";

-- CreateTable
CREATE TABLE "AiResults" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "AiResults_pkey" PRIMARY KEY ("id")
);
