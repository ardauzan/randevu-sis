CREATE TABLE IF NOT EXISTS "araçlar_randevular" (
	"araç" integer NOT NULL,
	"randevu" integer NOT NULL,
	CONSTRAINT "araçlar_randevular_araç_randevu_pk" PRIMARY KEY("araç","randevu")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projeler_gereçler" (
	"proje" integer NOT NULL,
	"gereç" integer NOT NULL,
	"adet" integer NOT NULL,
	CONSTRAINT "projeler_gereçler_proje_gereç_pk" PRIMARY KEY("proje","gereç")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "araçlar_randevular" ADD CONSTRAINT "araçlar_randevular_araç_araçlar_id_fk" FOREIGN KEY ("araç") REFERENCES "public"."araçlar"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "araçlar_randevular" ADD CONSTRAINT "araçlar_randevular_randevu_randevular_id_fk" FOREIGN KEY ("randevu") REFERENCES "public"."randevular"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projeler_gereçler" ADD CONSTRAINT "projeler_gereçler_proje_projeler_id_fk" FOREIGN KEY ("proje") REFERENCES "public"."projeler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projeler_gereçler" ADD CONSTRAINT "projeler_gereçler_gereç_gereçler_id_fk" FOREIGN KEY ("gereç") REFERENCES "public"."gereçler"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
