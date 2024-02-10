-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "tag_name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_name")
);

-- CreateTable
CREATE TABLE "Post_Tag" (
    "tag_name" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Post_Tag_pkey" PRIMARY KEY ("tag_name","post_id")
);

-- AddForeignKey
ALTER TABLE "Post_Tag" ADD CONSTRAINT "Post_Tag_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "Tag"("tag_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Tag" ADD CONSTRAINT "Post_Tag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
