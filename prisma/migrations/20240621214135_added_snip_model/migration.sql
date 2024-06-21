-- CreateTable
CREATE TABLE "Snip" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "files" TEXT[],
    "email" TEXT NOT NULL,

    CONSTRAINT "Snip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Snip_email_key" ON "Snip"("email");

-- AddForeignKey
ALTER TABLE "Snip" ADD CONSTRAINT "Snip_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
