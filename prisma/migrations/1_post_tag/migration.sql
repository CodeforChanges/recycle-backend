-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Post_Tag" (
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "Post_Tag_pkey" PRIMARY KEY ("tag_name")
);

-- CreateTable
CREATE TABLE "_PostToPost_Tag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToPost_Tag_AB_unique" ON "_PostToPost_Tag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToPost_Tag_B_index" ON "_PostToPost_Tag"("B");

-- AddForeignKey
ALTER TABLE "_PostToPost_Tag" ADD CONSTRAINT "_PostToPost_Tag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPost_Tag" ADD CONSTRAINT "_PostToPost_Tag_B_fkey" FOREIGN KEY ("B") REFERENCES "Post_Tag"("tag_name") ON DELETE CASCADE ON UPDATE CASCADE;
