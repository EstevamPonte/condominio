-- CreateTable
CREATE TABLE "Units" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "userId" TEXT,
    "code" TEXT NOT NULL,
    "floor" INTEGER,
    "bedrooms" INTEGER NOT NULL,
    "areaSqm" DECIMAL(10,2),
    "parkingSpaces" INTEGER NOT NULL DEFAULT 0,
    "monthlyRent" DECIMAL(10,2) NOT NULL,
    "condominiumFee" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'available',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Units_buildingId_idx" ON "Units"("buildingId");

-- CreateIndex
CREATE INDEX "Units_userId_idx" ON "Units"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Units_buildingId_code_key" ON "Units"("buildingId", "code");

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
